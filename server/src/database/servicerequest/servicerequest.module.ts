import { Module } from '@nestjs/common';
import { ServicerequestService } from './servicerequest.service';
import { ServicerequestResolver } from './servicerequest.resolver';

@Module({
  providers: [ServicerequestResolver, ServicerequestService],
})
export class ServicerequestModule {}
