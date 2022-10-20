import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateResidentInput, UpdateResidentInput } from 'src/types/graphql';
import { ResidentService } from './resident.service';

@Resolver('Resident')
export class ResidentResolver {
  constructor(private readonly residentService: ResidentService) {}

  @Mutation('createResident')
  create(
    @Args('createResidentInput') createResidentInput: CreateResidentInput,
  ) {
    return this.residentService.create(createResidentInput);
  }

  @Query('residents')
  findAll() {
    return this.residentService.findAll();
  }

  @Query('resident')
  findOne(@Args('id') id: string) {
    return this.residentService.findOne(id);
  }

  @Mutation('updateResident')
  update(
    @Args('updateResidentInput') updateResidentInput: UpdateResidentInput,
  ) {
    return this.residentService.update(
      updateResidentInput.id,
      updateResidentInput,
    );
  }

  @Mutation('removeResident')
  remove(@Args('id') id: string) {
    return this.residentService.remove(id);
  }
}
