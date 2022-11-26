import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from 'src/types/graphql';
import { PrismaService } from '../prisma.service';

import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async profile(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: { name: true, surn: true, authId: true },
    });
  }

  async login(loginUserInput: LoginUserInput) {
    let userId: string;

    await this.prisma.user
      .findUnique({
        where: {
          email: loginUserInput.email,
        },
        select: { id: true, pwd: true },
      })
      .then(async (user) => {
        if (user) {
          userId = await new Promise((resolve) => {
            bcrypt.compare(
              loginUserInput.pwd,
              user.pwd,
              (err, result: boolean) => {
                if (result) resolve(user.id);
                else resolve('WrongPassword');
              },
            );
          });
        } else {
          userId = 'UnknownUser';
        }
      });

    return { id: userId, authId: 0 };
  }

  async create(createUserInput: CreateUserInput) {
    const newUser = createUserInput;

    const exists = await this.prisma.user.findFirst({
      where: {
        email: createUserInput.email,
      },
      select: { id: true },
    });

    if (exists) {
      return { id: '0' };
    }
    const newPWD: string = await new Promise((resolve, reject) => {
      bcrypt.hash(createUserInput.pwd, saltRounds, (err, hash: string) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    newUser.pwd = newPWD;

    return this.prisma.user.create({
      data: { ...newUser, authId: 0 },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: { id: true, name: true },
    });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserInput,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}
