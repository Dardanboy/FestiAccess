import { Storage} from '@ionic/storage';
import { User } from '../app/models/User';
import {Role} from '../app/models/Role';

export class DataProvider {
    private storage: Storage;
    public user: User;

    constructor(storage: Storage) {
        this.storage = storage;
        this.storage.ready().then(() => {
            this.clear().then(() => {
                this.init();
                this.store().then( () => {
                    console.log('Storage has been set !');
                }).catch(() => {
                    console.log('Didn\'t work');
                });
            });
        });
    }

    makeARequest(){

    }

    init() {
        this.user = (new User('Dardan', 'Iljazi', false, 'cmFuZG9tX2hhc2g=', new Role('invited'), []));
    }

    store() {
        return this.storage.set('users', this.user);
    }

    clear() {
        return this.storage.clear();
    }

    get(toGet) {
        return this.storage.get(toGet);
    }
}
