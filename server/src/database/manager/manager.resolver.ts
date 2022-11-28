import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateManagerInput, UpdateManagerInput } from 'src/types/graphql';
import { ManagerService } from './manager.service';
import { Roles } from 'src/auth/roles.decorator';

@Resolver('Manager')
@UseGuards(RolesGuard)
export class ManagerResolver {
  constructor(private readonly managerService: ManagerService) {}

  @Mutation('createManager')
  @Roles('Admin', 'Manager')
  create(@Args('createManagerInput') createManagerInput: CreateManagerInput) {
    return this.managerService.create(createManagerInput);
  }

  @Query('managers')
  @Roles('Admin', 'Manager')
  findAll() {
    return this.managerService.findAll();
  }

  @Query('manager')
  @Roles('Admin', 'Manager')
  findOne(@Args('id') id: string) {
    return this.managerService.findOne(id);
  }

  @Mutation('updateManager')
  @Roles('Admin', 'Manager')
  update(@Args('updateManagerInput') updateManagerInput: UpdateManagerInput) {
    return this.managerService.update(
      updateManagerInput.id,
      updateManagerInput,
    );
  }

  @Mutation('removeManager')
  @Roles('Admin', 'Manager')
  remove(@Args('id') id: string) {
    return this.managerService.remove(id);
  }
}
