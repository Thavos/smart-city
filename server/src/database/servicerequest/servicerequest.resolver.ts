import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServicerequestService } from './servicerequest.service';
import {
  CreateServicerequestInput,
  UpdateServicerequestInput,
} from 'src/types/graphql';

@Resolver('Servicerequest')
export class ServicerequestResolver {
  constructor(private readonly servicerequestService: ServicerequestService) {}

  @Mutation('createServicerequest')
  create(
    @Args('createServicerequestInput')
    createServicerequestInput: CreateServicerequestInput,
  ) {
    return this.servicerequestService.create(createServicerequestInput);
  }

  @Query('servicerequest')
  findAll() {
    return this.servicerequestService.findAll();
  }

  @Query('servicerequests')
  findOne(@Args('id') id: string) {
    return this.servicerequestService.findOne(id);
  }

  @Mutation('updateServicerequest')
  update(
    @Args('updateServicerequestInput')
    updateServicerequestInput: UpdateServicerequestInput,
  ) {
    return this.servicerequestService.update(
      updateServicerequestInput.id,
      updateServicerequestInput,
    );
  }

  @Mutation('removeServicerequest')
  remove(@Args('id') id: string) {
    return this.servicerequestService.remove(id);
  }
}
