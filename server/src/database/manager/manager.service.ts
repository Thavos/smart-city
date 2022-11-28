import { Injectable } from '@nestjs/common';
import { CreateManagerInput, UpdateManagerInput } from 'src/types/graphql';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ManagerService {
  constructor(private readonly prisma: PrismaService) {}

  create(createManagerInput: CreateManagerInput) {
    return this.prisma.manager.create({
      data: createManagerInput,
    });
  }

  findAll() {
    return this.prisma.manager.findMany({ include: { user: true } });
  }

  findOne(id: string) {
    return this.prisma.manager.findUnique({
      where: { id: id },
      select: { id: true },
    });
  }

  update(id: string, updateManagerInput: UpdateManagerInput) {
    return this.prisma.manager.update({
      where: { id: id },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: updateManagerInput,
    });
  }

  remove(id: string) {
    return this.prisma.manager.delete({
      where: { id: id },
    });
  }
}
