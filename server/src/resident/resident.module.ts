import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { ResidentResolver } from './resident.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ResidentResolver, ResidentService, PrismaService],
})
export class ResidentModule {}
