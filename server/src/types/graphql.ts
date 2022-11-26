
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCommentInput {
    desc: string;
    createAt: number;
    userId: string;
    ticketId: string;
}

export class UpdateCommentInput {
    id?: Nullable<string>;
    desc?: Nullable<string>;
}

export class CreateManagerInput {
    userId: string;
}

export class UpdateManagerInput {
    id?: Nullable<string>;
    userId?: Nullable<string>;
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
    id?: Nullable<string>;
    name?: Nullable<string>;
    desc?: Nullable<string>;
    state?: Nullable<number>;
    expectedFinish?: Nullable<string>;
    commnet?: Nullable<string>;
    price?: Nullable<number>;
    managerId?: Nullable<string>;
    technicianId?: Nullable<string>;
}

export class CreateTechnicianInput {
    userId: string;
}

export class UpdateTechnicianInput {
    id?: Nullable<string>;
    userId?: Nullable<string>;
}

export class CreateTicketInput {
    name: string;
    desc: string;
    state: number;
    userId: string;
    createdAt: string;
}

export class UpdateTicketInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    desc?: Nullable<string>;
    state?: Nullable<number>;
}

export class CreateUserInput {
    name: string;
    surn: string;
    email: string;
    pwd: string;
}

export class UpdateUserInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    surn?: Nullable<string>;
    email?: Nullable<string>;
    pwd?: Nullable<string>;
    authId?: Nullable<number>;
}

export class LoginUserInput {
    email: string;
    pwd: string;
}

export class Comment {
    id: string;
    desc: string;
    createAt: number;
    userId: string;
    ticketId: string;
}

export abstract class IQuery {
    abstract comment(): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;

    abstract comments(id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract manager(): Nullable<Nullable<Manager>[]> | Promise<Nullable<Nullable<Manager>[]>>;

    abstract managers(id: string): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract servicerequest(): Nullable<Nullable<Servicerequest>[]> | Promise<Nullable<Nullable<Servicerequest>[]>>;

    abstract servicerequests(id: string): Nullable<Servicerequest> | Promise<Nullable<Servicerequest>>;

    abstract technician(): Nullable<Nullable<Technician>[]> | Promise<Nullable<Nullable<Technician>[]>>;

    abstract technicians(id: string): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract ticket(): Nullable<Nullable<Ticket>[]> | Promise<Nullable<Nullable<Ticket>[]>>;

    abstract tickets(id: string): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract user(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract users(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract profile(): Nullable<User> | Promise<Nullable<User>>;

    abstract login(loginUserInput: LoginUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createComment(createCommentInput: CreateCommentInput): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract updateComment(updateCommentInput: UpdateCommentInput): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract removeComment(id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract createManager(createManagerInput: CreateManagerInput): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract updateManager(updateManagerInput: UpdateManagerInput): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract removeManager(id: string): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract createServicerequest(createServicerequestInput: CreateServicerequestInput): Nullable<Servicerequest> | Promise<Nullable<Servicerequest>>;

    abstract updateServicerequest(updateServicerequestInput: UpdateServicerequestInput): Nullable<Servicerequest> | Promise<Nullable<Servicerequest>>;

    abstract removeServicerequest(id: string): Nullable<Servicerequest> | Promise<Nullable<Servicerequest>>;

    abstract createTechnician(createTechnicianInput: CreateTechnicianInput): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract updateTechnician(updateTechnicianInput: UpdateTechnicianInput): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract removeTechnician(id: string): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract createTicket(createTicketInput: CreateTicketInput): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract updateTicket(updateTicketInput: UpdateTicketInput): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract removeTicket(id: string): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

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
    Technician?: Nullable<Technician>;
    Manager?: Nullable<Manager>;
    comments?: Nullable<Comment[]>;
    tickets?: Nullable<Ticket[]>;
}

type Nullable<T> = T | null;
