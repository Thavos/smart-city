import { Injectable } from '@nestjs/common';
import {
  CreateServiceRequestInput,
  UpdateServiceRequestInput,
} from 'src/types/graphql';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ServiceRequestService {
  constructor(private readonly prisma: PrismaService) {}

  create(createServiceRequestInput: CreateServiceRequestInput) {
    return this.prisma.serviceRequest.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO:
      data: createServiceRequestInput,
    });
  }

  async findAll() {
    const tickets = await this.prisma.serviceRequest.findMany({
      include: { Technician: true },
    });

    return;
  }

  findOne(id: string) {
    return this.prisma.serviceRequest.findUnique({
      where: { id: id },
      select: { id: true },
    });
  }

  update(id: string, updateServiceRequestInput: UpdateServiceRequestInput) {
    return this.prisma.serviceRequest.update({
      where: { id: id },
      data: updateServiceRequestInput,
    });
  }

  remove(id: string) {
    return this.prisma.serviceRequest.delete({
      where: { id: id },
    });
  }
}
