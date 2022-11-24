import { Module } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianResolver } from './technician.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TechnicianResolver, TechnicianService, PrismaService],
})
export class TechnicianModule {}
