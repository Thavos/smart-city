import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Info,
} from '@nestjs/graphql';
import { Request } from 'express';
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
  @Roles('Admin', 'Manager')
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
    const includeManager = body.body.query.indexOf('manager {') > -1;
    const includeTechnician = body.body.query.indexOf('technician {') > -1;
    const includeComments = body.body.query.indexOf('comments {') > -1;

    return this.userService.findAll(
      limit,
      name,
      surn,
      email,
      authId,
      sort,
      sortDir,
      includeTickets,
      includeManager,
      includeTechnician,
      includeComments,
    );
  }

  @Query('user')
  @Roles('Admin', 'Manager')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  @Roles('Admin', 'Manager')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  @Roles('Admin')
  remove(@Context('req') req: Request, @Args('id') id: string) {
    if (req.cookies['UserID'] == id) return 'Cant remove your own account';
    else return this.userService.remove(id);
  }
}
