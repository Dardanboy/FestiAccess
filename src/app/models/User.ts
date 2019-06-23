import {Role} from './Role';

export class User {
    id: number;
    name: string;
    surname: string;
    ishere: boolean;
    fingerPrintHash: string;
    role: string;
    friends: User[] = [];

    constructor(id: number,
                name: string,
                surname: string,
                ishere: boolean,
                fingerPrintHash: string,
                role: string,
                friends: User[]) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.ishere = ishere;
        this.fingerPrintHash = fingerPrintHash;
        this.role = role;
        this.friends = friends;
    }

    getName(): string {
        return this.name;
    }
}
