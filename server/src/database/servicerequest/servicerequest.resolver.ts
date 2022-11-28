import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServiceRequestService } from './ServiceRequest.service';
import {
  CreateServiceRequestInput,
  UpdateServiceRequestInput,
} from 'src/types/graphql';

@Resolver('ServiceRequest')
@UseGuards(RolesGuard)
export class ServiceRequestResolver {
  constructor(private readonly ServiceRequestService: ServiceRequestService) {}

  @Mutation('createServiceRequest')
  create(
    @Args('createServiceRequestInput')
    createServiceRequestInput: CreateServiceRequestInput,
  ) {
    return this.ServiceRequestService.create(createServiceRequestInput);
  }

  @Query('serviceRequests')
  findAll() {
    return this.ServiceRequestService.findAll();
  }

  @Query('serviceRequest')
  findOne(@Args('id') id: string) {
    return this.ServiceRequestService.findOne(id);
  }

  @Mutation('updateServiceRequest')
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
  remove(@Args('id') id: string) {
    return this.ServiceRequestService.remove(id);
  }
}
