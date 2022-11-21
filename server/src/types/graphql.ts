
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCommentInput {
    desc: string;
    createAt: string;
    userId: string;
    ticketId: string;
}

export class UpdateCommentInput {
    id: string;
    desc: string;
}

export class CreateManagerInput {
    userId: string;
}

export class UpdateManagerInput {
    id: string;
    userId: string;
}

export class CreateServicerequestInput {
    name: string;
    desc: string;
    state: number;
    expectedFinish: string;
    commnet: string;
    price: number;
    managerId: string;
    technicianId: string;
}

export class UpdateServicerequestInput {
    id: string;
    name: string;
    desc: string;
    state: number;
    expectedFinish: string;
    commnet: string;
    price: number;
    managerId: string;
    technicianId: string;
}

export class CreateTechnicianInput {
    userId: string;
}

export class UpdateTechnicianInput {
    id: string;
    userId: string;
}

export class CreateTicketInput {
    name: string;
    desc: string;
    state: number;
    userId: string;
}

export class UpdateTicketInput {
    id: string;
    name: string;
    desc: string;
    state: number;
    userId: string;
}

export class CreateUserInput {
    name: string;
    surn: string;
    email: string;
    pwd: string;
}

export class UpdateUserInput {
    id: string;
    name: string;
    surn: string;
    email: string;
    pwd: string;
    authId: number;
}

export class LoginUserInput {
    email: string;
    pwd: string;
}

export class Comment {
    id: string;
    desc: string;
    createAt: string;
    userId: string;
    ticketId: string;
}

export abstract class IQuery {
    abstract comment(): Nullable<Comment>[] | Promise<Nullable<Comment>[]>;

    abstract comments(id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract manager(): Nullable<Manager>[] | Promise<Nullable<Manager>[]>;

    abstract managers(id: string): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract servicerequest(): Nullable<Servicerequest>[] | Promise<Nullable<Servicerequest>[]>;

    abstract servicerequests(id: string): Nullable<Servicerequest> | Promise<Nullable<Servicerequest>>;

    abstract technician(): Nullable<Technician>[] | Promise<Nullable<Technician>[]>;

    abstract technicians(id: string): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract ticket(): Nullable<Ticket>[] | Promise<Nullable<Ticket>[]>;

    abstract tickets(id: string): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract user(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract users(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract profile(): Nullable<User> | Promise<Nullable<User>>;

    abstract login(loginUserInput?: Nullable<LoginUserInput>): User | Promise<User>;
}

export abstract class IMutation {
    abstract createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;

    abstract updateComment(updateCommentInput: UpdateCommentInput): Comment | Promise<Comment>;

    abstract removeComment(id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract createManager(createManagerInput: CreateManagerInput): Manager | Promise<Manager>;

    abstract updateManager(updateManagerInput: UpdateManagerInput): Manager | Promise<Manager>;

    abstract removeManager(id: string): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract createServicerequest(createServicerequestInput: CreateServicerequestInput): Servicerequest | Promise<Servicerequest>;

    abstract updateServicerequest(updateServicerequestInput: UpdateServicerequestInput): Servicerequest | Promise<Servicerequest>;

    abstract removeServicerequest(id: string): Nullable<Servicerequest> | Promise<Nullable<Servicerequest>>;

    abstract createTechnician(createTechnicianInput: CreateTechnicianInput): Technician | Promise<Technician>;

    abstract updateTechnician(updateTechnicianInput: UpdateTechnicianInput): Technician | Promise<Technician>;

    abstract removeTechnician(id: string): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract createTicket(createTicketInput?: Nullable<CreateTicketInput>): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract updateTicket(updateTicketInput?: Nullable<UpdateTicketInput>): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract removeTicket(id?: Nullable<string>): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract removeUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export class Manager {
    id: string;
    userId: string;
}

export class Servicerequest {
    id: string;
    name: string;
    desc: string;
    state: number;
    expectedFinish: string;
    commnet: string;
    price: number;
    createdAt: string;
    managerId: string;
    technicianId: string;
}

export class Technician {
    id: string;
    userId: string;
}

export class Ticket {
    id: string;
    name: string;
    desc: string;
    state: number;
    createdAt: string;
    userId: string;
}

export class User {
    id: string;
    name: string;
    surn: string;
    email: string;
    pwd: string;
    authId: number;
    Technician: Technician;
    Manager: Manager;
    comments: Comment[];
    tickets: Ticket[];
}

type Nullable<T> = T | null;
