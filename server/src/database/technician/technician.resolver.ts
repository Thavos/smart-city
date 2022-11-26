import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateTechnicianInput,
  UpdateTechnicianInput,
} from 'src/types/graphql';
import { TechnicianService } from './technician.service';

@Resolver('Technician')
export class TechnicianResolver {
  constructor(private readonly technicianService: TechnicianService) {}

  @Mutation('createTechnician')
  create(
    @Args('createTechnicianInput') createTechnicianInput: CreateTechnicianInput,
  ) {
    return this.technicianService.create(createTechnicianInput);
  }

  @Query('technicians')
  findAll() {
    return this.technicianService.findAll();
  }

  @Query('technician')
  findOne(@Args('id') id: string) {
    return this.technicianService.findOne(id);
  }

  @Mutation('updateTechnician')
  update(
    @Args('updateTechnicianInput') updateTechnicianInput: UpdateTechnicianInput,
  ) {
    return this.technicianService.update(
      updateTechnicianInput.id,
      updateTechnicianInput,
    );
  }

  @Mutation('removeTechnician')
  remove(@Args('id') id: string) {
    return this.technicianService.remove(id);
  }
}
