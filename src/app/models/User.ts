import {Role} from './Role';

export class User {
    public name: string;
    public surname: string;
    public ishere: boolean;
    public fingerPrintHash: string;
    public role: Role;
    public friends: User[] = [];

    constructor(name: string, surname: string, ishere: boolean, fingerPrintHash: string, role: Role, friends: User[]) {
        this.name = name;
        this.surname = surname;
        this.ishere = ishere;
        this.fingerPrintHash = fingerPrintHash;
        this.role = role;
        this.friends = friends;
    }
}
