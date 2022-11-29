import { Injectable } from '@nestjs/common';
import { CreateTicketInput, UpdateTicketInput, User } from 'src/types/graphql';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTicketInput: CreateTicketInput) {
    return this.prisma.ticket.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO:
      data: createTicketInput,
    });
  }

  myTickets(id: string) {
    return this.prisma.ticket.findMany({ where: { userId: id } });
  }

  findAll(
    limit: number | null,
    name: string | null,
    state: number | null,
    sort: 'name' | 'state' | null,
    sortDir: 'asc' | 'desc' | null,
    includeUser: boolean,
  ) {
    const where: Record<string, any> = {};
    const orderBy: Record<string, string>[] = [];

    if (name) {
      where.name = { contains: name };
    }

    if (state) {
      where.state = { in: state };
    }

    if (sort) {
      orderBy.push({ [sort]: sortDir });
    }

    return this.prisma.ticket.findMany({
      take: limit || 100,
      where,
      orderBy,
      //include: { user: includeUser },
    });
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
