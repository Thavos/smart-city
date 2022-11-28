import { Module } from '@nestjs/common';
import { ServiceRequestService } from './servicerequest.service';
import { ServiceRequestResolver } from './servicerequest.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ServiceRequestResolver, ServiceRequestService, PrismaService],
})
export class ServiceRequestModule {}
