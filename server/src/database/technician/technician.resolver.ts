import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateTechnicianInput,
  UpdateTechnicianInput,
} from 'src/types/graphql';
import { TechnicianService } from './technician.service';

@Resolver('Technician')
@UseGuards(RolesGuard)
export class TechnicianResolver {
  constructor(private readonly technicianService: TechnicianService) {}

  @Mutation('createTechnician')
  @Roles('Admin', 'Manager')
  create(
    @Args('createTechnicianInput') createTechnicianInput: CreateTechnicianInput,
  ) {
    return this.technicianService.create(createTechnicianInput);
  }

  @Query('technicians')
  @Roles('Admin', 'Manager')
  findAll() {
    return this.technicianService.findAll();
  }

  @Query('technician')
  @Roles('Admin', 'Manager')
  findOne(@Args('id') id: string) {
    return this.technicianService.findOne(id);
  }

  @Mutation('updateTechnician')
  @Roles('Admin', 'Manager')
  update(
    @Args('updateTechnicianInput') updateTechnicianInput: UpdateTechnicianInput,
  ) {
    return this.technicianService.update(
      updateTechnicianInput.id,
      updateTechnicianInput,
    );
  }

  @Mutation('removeTechnician')
  @Roles('Admin', 'Manager')
  remove(@Args('id') id: string) {
    return this.technicianService.remove(id);
  }
}
