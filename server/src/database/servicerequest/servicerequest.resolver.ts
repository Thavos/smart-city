import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ServiceRequestService } from './ServiceRequest.service';
import {
  CreateServiceRequestInput,
  UpdateServiceRequestInput,
} from 'src/types/graphql';
import { Roles } from 'src/auth/roles.decorator';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';

@Resolver('ServiceRequest')
@UseGuards(RolesGuard)
export class ServiceRequestResolver {
  constructor(
    private readonly ServiceRequestService: ServiceRequestService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('createServiceRequest')
  @Roles('Admin', 'Manager')
  async create(
    @Args('createServiceRequestInput')
    createServiceRequestInput: CreateServiceRequestInput,
    @Context('req') req: Request,
  ) {
    let manager;
    if (req.cookies['userID'])
      manager = await this.prisma.manager.findFirst({
        where: { userId: req.cookies['userID'] },
      });

    createServiceRequestInput.managerId = manager.id;

    return this.ServiceRequestService.create(createServiceRequestInput);
  }

  @Query('serviceRequests')
  @Roles('Technician')
  async findMyTickets(@Context('req') req: Request) {
    if (req.cookies['userID']) {
      const user = await this.prisma.user.findFirst({
        where: { id: req.cookies['userID'] },
        include: { technician: true },
      });

      return this.ServiceRequestService.findMyTickets(user.technician.id);
    }

    return;
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
