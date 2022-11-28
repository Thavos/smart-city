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

  async create({ ticket, ...newUser }: CreateUserInput) {
    const exists = await this.prisma.user.findFirst({
      where: {
        email: newUser.email,
      },
      select: { id: true },
    });

    if (exists) {
      return { id: '0' };
    }
    const newPWD: string = await new Promise((resolve, reject) => {
      bcrypt.hash(newUser.pwd, saltRounds, (err, hash: string) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    newUser.pwd = newPWD;

    const user = await this.prisma.user.create({
      data: { ...newUser, authId: 0 },
    });

    if (ticket) {
      await this.prisma.ticket.create({
        data: {
          ...ticket,
          userId: user.id,
        },
      });

      return this.prisma.user.findUnique({
        where: { id: user.id },
        include: { tickets: true },
      });
    }

    return user;
  }

  findAll(
    limit: number | null,
    name: string | null,
    surn: string | null,
    email: string | null,
    authId: number | null,
    sort: 'name' | 'surn' | 'email' | 'authId' | null,
    sortDir: 'asc' | 'desc' | null,
    includeTickets: boolean,
  ) {
    const where: Record<string, any> = {};
    const orderBy: Record<string, string>[] = [];

    if (name) {
      where.name = { contains: name };
    }

    if (surn) {
      where.surn = { contains: surn };
    }

    if (email) {
      where.email = { contains: email };
    }

    if (authId) {
      where.authId = { in: authId };
    }

    if (sort) {
      orderBy.push({ [sort]: sortDir });
    }

    return this.prisma.user.findMany({
      take: limit || 100,
      where,
      orderBy,
      include: {
        tickets: includeTickets,
        manager: true,
        technician: true,
        comments: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: { id: true, name: true },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });

    if (user.email == 'admin@admin.com') {
      return 'Cant change main admin data';
    }

    // Change technician into some other role so we have to delete its ref to technician table
    if (user.authId == 1 && updateUserInput.authId != 1) {
      await this.prisma.technician.update({
        where: { userId: user.id },
        data: { userId: 'FormerTechnician' },
      });
    }

    // Change manager into some other role so we have to delete its ref to technician table
    else if (user.authId == 2 && updateUserInput.authId != 2) {
      await this.prisma.manager.update({
        where: { userId: user.id },
        data: { userId: 'FormerManager' },
      });
    }

    // Change user into technician so new technician acc is needed
    if (updateUserInput.authId == 1) {
      await this.prisma.technician.create({ data: { userId: user.id } });
    }

    // Change user into manager so new technician acc is needed
    else if (updateUserInput.authId == 2) {
      await this.prisma.manager.create({ data: { userId: user.id } });
    }

    return this.prisma.user.update({
      where: { id: id },
      data: updateUserInput,
    });
  }

  async remove(id: string) {
    console.log(id);

    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        manager: true,
        technician: true,
        tickets: true,
        comments: true,
      },
    });

    if (user.email === 'admin@admin.com') {
      return 'Cant remove main admin';
    }

    return this.prisma.user.delete({
      where: { id: id },
      select: { id: true },
    });
  }
}
