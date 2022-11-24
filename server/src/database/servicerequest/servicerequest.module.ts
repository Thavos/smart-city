import { Module } from '@nestjs/common';
import { ServicerequestService } from './servicerequest.service';
import { ServicerequestResolver } from './servicerequest.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ServicerequestResolver, ServicerequestService, PrismaService],
})
export class ServicerequestModule {}
