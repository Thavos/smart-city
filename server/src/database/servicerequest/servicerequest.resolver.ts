import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServiceRequestService } from './servicerequest.service';
import {
  CreateServiceRequestInput,
  UpdateServiceRequestInput,
} from 'src/types/graphql';
import { Roles } from 'src/auth/roles.decorator';

@Resolver('ServiceRequest')
@UseGuards(RolesGuard)
export class ServiceRequestResolver {
  constructor(private readonly ServiceRequestService: ServiceRequestService) {}

  @Mutation('createServiceRequest')
  @Roles('Admin', 'Manager')
  create(
    @Args('createServiceRequestInput')
    createServiceRequestInput: CreateServiceRequestInput,
  ) {
    return this.ServiceRequestService.create(createServiceRequestInput);
  }

  @Query('serviceRequests')
  @Roles('Admin', 'Manager', 'Technician')
  findAll() {
    return this.ServiceRequestService.findAll();
  }

  @Query('serviceRequest')
  @Roles('Admin', 'Manager', 'Technician')
  findOne(@Args('id') id: string) {
    return this.ServiceRequestService.findOne(id);
  }

  @Mutation('updateServiceRequest')
  @Roles('Admin', 'Manager', 'Technician')
  update(
    @Args('updateServiceRequestInput')
    updateServiceRequestInput: UpdateServiceRequestInput,
  ) {
    return this.ServiceRequestService.update(
      updateServiceRequestInput.id,
      updateServiceRequestInput,
    );
  }

  @Mutation('removeServiceRequest')
  @Roles('Admin', 'Manager')
  remove(@Args('id') id: string) {
    return this.ServiceRequestService.remove(id);
  }
}
