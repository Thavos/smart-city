import { Req, Res } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from 'src/types/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('profile')
  profile(@Context('req') req: Request) {
    if (req.cookies['userID'])
      return this.userService.profile(req.cookies['userID']);
  }

  @Query('login')
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context('req') req: Request,
  ) {
    const result = await this.userService.login(loginUserInput);

    req.res.cookie('userID', result.id, { httpOnly: true });

    return result;
  }

  @Mutation('createUser')
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context('req') req: Request,
  ) {
    const result = await this.userService.create(createUserInput);

    req.res.cookie('userID', result.id, { httpOnly: true });

    return result;
  }

  @Query('user')
  findAll() {
    return this.userService.findAll();
  }

  @Query('users')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
