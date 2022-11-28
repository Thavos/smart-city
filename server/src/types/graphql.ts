
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SortDir {
    ASC = "ASC",
    DESC = "DESC"
}

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
    userId?: Nullable<string>;
}

export class UpdateManagerInput {
    id: string;
    userId?: Nullable<string>;
}

export class CreateServiceRequestInput {
    name: string;
    desc: string;
    state: number;
    expectedFinish: string;
    price: number;
    managerId: string;
    technicianId: string;
}

export class UpdateServiceRequestInput {
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
    userId?: Nullable<string>;
}

export class UpdateTechnicianInput {
    id: string;
    userId?: Nullable<string>;
}

export class CreateTicketInput {
    name: string;
    desc: string;
    state: number;
    userId?: Nullable<string>;
}

export class UpdateTicketInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    desc?: Nullable<string>;
    state?: Nullable<number>;
    userId?: Nullable<string>;
}

export class CreateUserInput {
    name: string;
    surn: string;
    email: string;
    pwd: string;
    ticket?: Nullable<CreateTicketInput>;
}

export class UpdateUserInput {
    id: string;
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

    abstract comments(id?: Nullable<string>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract managers(): Nullable<Nullable<Manager>[]> | Promise<Nullable<Nullable<Manager>[]>>;

    abstract manager(id?: Nullable<string>): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract serviceRequests(): Nullable<Nullable<ServiceRequest>[]> | Promise<Nullable<Nullable<ServiceRequest>[]>>;

    abstract serviceRequest(id?: Nullable<string>): Nullable<ServiceRequest> | Promise<Nullable<ServiceRequest>>;

    abstract technicians(): Nullable<Nullable<Technician>[]> | Promise<Nullable<Nullable<Technician>[]>>;

    abstract technician(id?: Nullable<string>): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract tickets(): Nullable<Nullable<Ticket>[]> | Promise<Nullable<Nullable<Ticket>[]>>;

    abstract ticket(id?: Nullable<string>): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract users(limit?: Nullable<number>, name?: Nullable<string>, surn?: Nullable<string>, email?: Nullable<string>, authId?: Nullable<number>, sort?: Nullable<string>, sortDir?: Nullable<SortDir>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;

    abstract profile(): Nullable<User> | Promise<Nullable<User>>;

    abstract login(loginUserInput?: Nullable<LoginUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createComment(createCommentInput?: Nullable<CreateCommentInput>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract updateComment(updateCommentInput?: Nullable<UpdateCommentInput>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract removeComment(id?: Nullable<string>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract createManager(createManagerInput?: Nullable<CreateManagerInput>): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract updateManager(updateManagerInput?: Nullable<UpdateManagerInput>): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract removeManager(id?: Nullable<string>): Nullable<Manager> | Promise<Nullable<Manager>>;

    abstract createServiceRequest(createServiceRequestInput?: Nullable<CreateServiceRequestInput>): Nullable<ServiceRequest> | Promise<Nullable<ServiceRequest>>;

    abstract updateServiceRequest(updateServiceRequestInput?: Nullable<UpdateServiceRequestInput>): Nullable<ServiceRequest> | Promise<Nullable<ServiceRequest>>;

    abstract removeServiceRequest(id?: Nullable<string>): Nullable<ServiceRequest> | Promise<Nullable<ServiceRequest>>;

    abstract createTechnician(createTechnicianInput?: Nullable<CreateTechnicianInput>): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract updateTechnician(updateTechnicianInput?: Nullable<UpdateTechnicianInput>): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract removeTechnician(id?: Nullable<string>): Nullable<Technician> | Promise<Nullable<Technician>>;

    abstract createTicket(createTicketInput?: Nullable<CreateTicketInput>): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract updateTicket(updateTicketInput?: Nullable<UpdateTicketInput>): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract removeTicket(id?: Nullable<string>): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract removeUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export class Manager {
    id: string;
    userId?: Nullable<string>;
    user?: Nullable<User>;
}

export class ServiceRequest {
    id: string;
    name: string;
    desc: string;
    state: number;
    expectedFinish: string;
    price: number;
    createdAt: string;
    managerId: string;
    technicianId: string;
}

export class Technician {
    id: string;
    userId: string;
    user?: Nullable<User>;
}

export class Ticket {
    id: string;
    name: string;
    desc: string;
    state: number;
    createdAt: string;
    user?: Nullable<User>;
    userId?: Nullable<string>;
}

export class User {
    id: string;
    name: string;
    surn: string;
    email: string;
    pwd: string;
    authId: number;
    technician?: Nullable<Technician>;
    manager?: Nullable<Manager>;
    comments?: Nullable<Comment[]>;
    tickets?: Nullable<Ticket[]>;
}

type Nullable<T> = T | null;
