import { Storage} from '@ionic/storage';
import { User } from '../app/models/User';
import {Role} from '../app/models/Role';

export class DataProvider {
    private storage: Storage;
    public user: User;

    constructor(storage: Storage) {
        this.storage = storage;
        // this.storage.ready().then(() => {
        //     this.storage.get('flowers').then((data) => {
        //         this.flowers.push(data);
        //     }).catch(() => {
        //         this.flowers.push(null);
        //     });
        // });

        this.init();
        this.store();
    }

    init() {
        this.storage.ready().then(() => {
            this.user = new User('Dardan', 'Iljazi', false, 'cmFuZG9tX2hhc2g=', new Role('invited'));
        });
    }

    store() {
        this.storage.set('user', this.user).then((data) => {
             resolve(data);
        }).catch((reason) => {
             reject(reason);
        });
    }

    clear() {
        this.storage.clear().then(() =>{
            console.log('Storage cleared');
        });
    }

    get(toGet) {
        return this.storage.get(toGet);
    }
}
