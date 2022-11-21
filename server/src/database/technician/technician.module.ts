import { Module } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianResolver } from './technician.resolver';

@Module({
  providers: [TechnicianResolver, TechnicianService],
})
export class TechnicianModule {}
