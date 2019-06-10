import {User} from './User';
import {Role} from './Role';

export class Friend extends User {
    constructor(id: number, name: string, surname: string, ishere: boolean, fingerPrintHash: string, role: string, friends: User[]) {
        super(id, name, surname, ishere, fingerPrintHash, role, friends);
    }
}
