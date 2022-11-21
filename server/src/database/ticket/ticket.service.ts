import { Injectable } from '@nestjs/common';
import { CreateTicketInput, UpdateTicketInput } from 'src/types/graphql';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTicketInput: CreateTicketInput) {
    return this.prisma.ticket.create({
      data: createTicketInput,
    });
  }

  findAll() {
    return this.prisma.ticket.findMany();
  }

  findOne(id: string) {
    return this.prisma.ticket.findUnique({
      where: { id: id },
      select: { id: true, name: true },
    });
  }

  update(id: string, updateTicketInput: UpdateTicketInput) {
    return this.prisma.ticket.update({
      where: { id: id },
      data: updateTicketInput,
    });
  }

  remove(id: string) {
    return this.prisma.ticket.delete({
      where: { id: id },
    });
  }
}
