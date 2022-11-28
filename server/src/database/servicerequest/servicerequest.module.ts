import { Module } from '@nestjs/common';
import { ServiceRequestService } from './ServiceRequest.service';
import { ServiceRequestResolver } from './ServiceRequest.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ServiceRequestResolver, ServiceRequestService, PrismaService],
})
export class ServiceRequestModule {}
