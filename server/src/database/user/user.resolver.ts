import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from 'src/types/graphql';
import { UserService } from './user.service';

@Resolver('User')
@UseGuards(RolesGuard)
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

  @Query('filter')
  filter(filter: string) {
    return.this.userService.filter(filter);
  }

  @Query('users')
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  @Roles('admin')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  @Roles('admin')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
