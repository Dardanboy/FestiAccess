import {User} from './User';
import {Role} from './Role';

export class Friend extends User {
    constructor(name: string, surname: string, ishere: boolean, fingerPrintHash: string, role: Role, friends: User[]) {
        super(name, surname, ishere, fingerPrintHash, role, friends);
    }
}
