import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { CreateTicketInput, UpdateTicketInput } from 'src/types/graphql';
import { TicketService } from './ticket.service';

@Resolver('Ticket')
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Mutation('createTicket')
  create(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
    @Context('req') req: Request,
  ) {
    const id = req.cookies['userID'];

    const data = createTicketInput;

    data.userId = id;

    return this.ticketService.create(data);
  }

  @Query('ticket')
  findAll() {
    return this.ticketService.findAll();
  }

  @Query('tickets')
  findOne(@Args('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Mutation('updateTicket')
  update(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {
    return this.ticketService.update(updateTicketInput.id, updateTicketInput);
  }

  @Mutation('removeTicket')
  remove(@Args('id') id: string) {
    return this.ticketService.remove(id);
  }
}
