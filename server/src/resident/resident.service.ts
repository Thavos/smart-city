import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateResidentInput,
  Resident,
  UpdateResidentInput,
} from 'src/types/graphql';

@Injectable()
export class ResidentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createResidentInput: CreateResidentInput) {
    return this.prisma.resident.create({
      data: createResidentInput,
    });
  }

  findAll() {
    return this.prisma.resident.findMany();
  }

  findOne(id: string) {
    return this.prisma.resident.findUnique({
      where: { id: id },
      select: { name: true, id: true },
    });
  }

  update(id: string, createResidentInput: UpdateResidentInput) {
    return this.prisma.resident.update({
      where: { id: id },
      data: createResidentInput,
    });
  }

  remove(id: string) {
    return this.prisma.resident.delete({
      where: { id: id },
    });
  }
}
