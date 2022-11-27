import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Info,
} from '@nestjs/graphql';
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

  @Query('users')
  //@Roles('admin')
  findAll(
    @Args('limit') limit: number | null,
    @Args('name') name: string | null,
    @Args('surn') surn: string | null,
    @Args('email') email: string | null,
    @Args('authId') authId: number | null,
    @Args('sort') sort: 'name' | 'surn' | 'email' | 'authId' | null,
    @Args('sortDir') sortDir: 'asc' | 'desc' | null,
    @Context('req') body: Request,
  ) {
    const includeTickets = body.body.query.indexOf('tickets {') > -1;

    return this.userService.findAll(
      limit,
      name,
      surn,
      email,
      authId,
      sort,
      sortDir,
      includeTickets,
    );
  }

  @Query('user')
  //@Roles('admin')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  //@Roles('admin')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  //@Roles('admin')
  remove(@Context('req') req: Request, @Args('id') id: string) {
    if (req.cookies['UserID'] == id) return false;
    else return this.userService.remove(id);
  }
}
