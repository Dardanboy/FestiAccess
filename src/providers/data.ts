import { Storage} from '@ionic/storage';
import { User } from '../app/models/User';
import {Role} from '../app/models/Role';
import {HttpClient} from '@angular/common/http';


export class DataProvider {
    private storage: Storage;
    private user: User;
    private http: HttpClient;

    constructor(storage: Storage, http: HttpClient) {
        this.storage = storage;
        this.http = http;
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

    /*
     * Send a request to the API and wait for the response.
     */
    sendAndWaitResponse(url, path, method: string, data: string) {

    }

    get(toGet) {
        return this.storage.get(toGet);
    }

    private init() {
        this.user = (new User('Dardan', 'Iljazi', false, 'cmFuZG9tX2hhc2g=', new Role('invited'), []));
    }

    private store() {
        return this.storage.set('users', this.user);
    }

    private clear() {
        return this.storage.clear();
    }
}
