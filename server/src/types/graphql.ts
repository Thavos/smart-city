
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateResidentInput {
    name: string;
}

export class UpdateResidentInput {
    id: string;
    name: string;
}

export class Resident {
    id: string;
    name: string;
}

export abstract class IQuery {
    abstract residents(): Nullable<Resident>[] | Promise<Nullable<Resident>[]>;

    abstract resident(id: string): Nullable<Resident> | Promise<Nullable<Resident>>;
}

export abstract class IMutation {
    abstract createResident(createResidentInput: CreateResidentInput): Resident | Promise<Resident>;

    abstract updateResident(updateResidentInput: UpdateResidentInput): Resident | Promise<Resident>;

    abstract removeResident(id: string): Nullable<Resident> | Promise<Nullable<Resident>>;
}

type Nullable<T> = T | null;
