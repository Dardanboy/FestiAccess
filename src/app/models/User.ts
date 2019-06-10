import {Role} from './Role';

export class User {
    public id: number;
    public name: string;
    public surname: string;
    public ishere: boolean;
    public fingerPrintHash: string;
    public role: string;
    public friends: User[] = [];

    constructor(id: number = -1,
                name: string = 'Default',
                surname: string = 'Default',
                ishere: boolean = false,
                fingerPrintHash: string = 'nope',
                role: string = 'user',
                friends: User[] = null) {
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
