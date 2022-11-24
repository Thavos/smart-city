import { Injectable } from '@nestjs/common';
import {
  CreateServicerequestInput,
  UpdateServicerequestInput,
} from 'src/types/graphql';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ServicerequestService {
  constructor(private readonly prisma: PrismaService) {}

  create(createServicerequestInput: CreateServicerequestInput) {
    return this.prisma.serviceRequest.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO:
      data: createServicerequestInput,
    });
  }

  findAll() {
    return this.prisma.serviceRequest.findMany();
  }

  findOne(id: string) {
    return this.prisma.serviceRequest.findUnique({
      where: { id: id },
      select: { id: true },
    });
  }

  update(id: string, updateServicerequestInput: UpdateServicerequestInput) {
    return this.prisma.serviceRequest.update({
      where: { id: id },
      data: updateServicerequestInput,
    });
  }

  remove(id: string) {
    return this.prisma.serviceRequest.delete({
      where: { id: id },
    });
  }
}
