import { Injectable } from '@nestjs/common';
import {
  CreateTechnicianInput,
  UpdateTechnicianInput,
} from 'src/types/graphql';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TechnicianService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTechnicianInput: CreateTechnicianInput) {
    return this.prisma.technician.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO:
      data: createTechnicianInput,
    });
  }

  findAll() {
    return this.prisma.technician.findMany({ include: { user: true } });
  }

  findOne(id: string) {
    return this.prisma.technician.findUnique({
      where: { id: id },
      select: { id: true },
    });
  }

  update(id: string, updateTechnicianInput: UpdateTechnicianInput) {
    return this.prisma.technician.update({
      where: { id: id },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: updateTechnicianInput,
    });
  }

  remove(id: string) {
    return this.prisma.technician.delete({
      where: { id: id },
    });
  }
}
