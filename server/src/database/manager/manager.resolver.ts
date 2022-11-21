import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateManagerInput, UpdateManagerInput } from 'src/types/graphql';
import { ManagerService } from './manager.service';

@Resolver('Manager')
export class ManagerResolver {
  constructor(private readonly managerService: ManagerService) {}

  @Mutation('createManager')
  create(@Args('createManagerInput') createManagerInput: CreateManagerInput) {
    return this.managerService.create(createManagerInput);
  }

  @Query('manager')
  findAll() {
    return this.managerService.findAll();
  }

  @Query('managers')
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
