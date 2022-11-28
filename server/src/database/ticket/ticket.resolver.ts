import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { CreateTicketInput, UpdateTicketInput } from 'src/types/graphql';
import { TicketService } from './ticket.service';

@Resolver('Ticket')
@UseGuards(RolesGuard)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Mutation('createTicket')
  create(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
    @Context('req') req: Request,
  ) {
    const id = req.cookies['userID'];

    const data = createTicketInput;

    //data.userInput.id = id;

    return this.ticketService.create(data);
  }

  @Query('tickets')
  findAll(
    @Args('limit') limit: number | null,
    @Args('name') name: string | null,
    @Args('state') state: number | null,
    @Args('sort') sort: 'name' | 'state' | null,
    @Args('sortDir') sortDir: 'asc' | 'desc' | null,
    @Context('req') body: Request,
  ) {
    const includeUser = body.body.query.indexOf('user {') > -1;

    return this.ticketService.findAll(
      limit,
      name,
      state,
      sort,
      sortDir,
      includeUser,
    );
  }

  @Query('ticket')
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
