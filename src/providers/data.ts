import { Storage} from '@ionic/storage';
import { User } from '../app/models/User';
import {Role} from '../app/models/Role';
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {ApiService} from './api';

export enum DataProviderEnum {
    Get,
    Post,
    Put,
    Delete
}

@Injectable()
export class DataProvider {
    private _apiService: ApiService;
    private user: User;

    constructor(private storage: Storage, private http: HttpClient, apiService: ApiService) {
        this._apiService = apiService;
        this.storage.ready().then(() => {
            this.clear().then(() => {
                this.init();
                // this.store('users', ).then( () => {
                //     console.log('Storage has been set !');
                // }).catch(() => {
                //     console.log('Didn\'t work');
                // });
            });
        });
    }

    get apiService(): ApiService {
        return this._apiService;
    }

    set apiService(value: ApiService) {
        this._apiService = value;
    }

    /*
     * Send a request to the API and wait for the response.
     */
    sendAndWaitResponse(url, path, method: DataProviderEnum, data: string) {

    }

    get(toGet) {
        return this.storage.get(toGet);
    }

    private init() {
        this.user = (new User('Dardan', 'Iljazi', false, 'cmFuZG9tX2hhc2g=', new Role('invited'), []));
    }

    private store(key, data) {
        return this.storage.set(key, data);
    }

    private clear() {
        return this.storage.clear();
    }
}
