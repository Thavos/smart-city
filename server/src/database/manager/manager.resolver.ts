import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateManagerInput, UpdateManagerInput } from 'src/types/graphql';
import { ManagerService } from './manager.service';

@Resolver('Manager')
@UseGuards(RolesGuard)
export class ManagerResolver {
  constructor(private readonly managerService: ManagerService) {}

  @Mutation('createManager')
  create(@Args('createManagerInput') createManagerInput: CreateManagerInput) {
    return this.managerService.create(createManagerInput);
  }

  @Query('managers')
  findAll() {
    return this.managerService.findAll();
  }

  @Query('manager')
  findOne(@Args('id') id: string) {
    return this.managerService.findOne(id);
  }

  @Mutation('updateManager')
  update(@Args('updateManagerInput') updateManagerInput: UpdateManagerInput) {
    return this.managerService.update(
      updateManagerInput.id,
      updateManagerInput,
    );
  }

  @Mutation('removeManager')
  remove(@Args('id') id: string) {
    return this.managerService.remove(id);
  }
}
