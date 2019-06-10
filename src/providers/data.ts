import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from './api';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {ClassType} from 'class-transformer/ClassTransformer';

export enum DataProviderEnum {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

@Injectable()
export class DataProvider {
    private requestsResultCache: Map<string, any>;

    constructor(private storage: Storage, private http: HttpClient) {
        this.requestsResultCache = new Map<string, any>();
        this.storage.ready().then(() => {
            // this.clear().then(() => {
            //     this.init();
            //     // this.store('users', ).then( () => {
            //     //     console.log('Storage has been set !');
            //     // }).catch(() => {
            //     //     console.log('Didn\'t work');
            //     // });
            // });
        });
    }

    get apiService(): ApiService {
        return this._apiService;
    }

    /*
     * Send a request to the API and wait for the response.
     */
    sendAndWaitResponse(apiService: ApiService, method: DataProviderEnum, data: any, storeIn: ClassType<any>): Promise<any> {

        let promise = null;
        if (method === DataProviderEnum.POST || method === DataProviderEnum.PUT) {
            if (typeof data === 'object') {
                data = this.serializeObject(data);
                console.log('serialized data: ' + data);
            }

            promise = this.http[method](
                apiService.fullUrl(),
                data,
                {observe: 'response', headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
            ).toPromise();
        } else {
            promise = this.http[method](apiService.fullUrl(), {observe: 'response'}).toPromise();
        }

        promise.then((response) => {
            this.storeDataInMemoryCache(this.getDataFromApiResponse(this.getDataFromHttpClient(response)), storeIn);
        });

        return promise;
    }

    getFromCache(storedIn: ClassType<any>): any {
        return this.requestsResultCache.get(storedIn.name);
    }

    private get(toGet) {
        return this.storage.get(toGet);
    }

    private init() {
        // this.user = (new User('Dardan', 'Iljazi', false, 'cmFuZG9tX2hhc2g=', new Role('invited'), []));
    }

    private store(key, data) {
        return this.storage.set(key, data);
    }

    private clear() {
        return this.storage.clear();
    }

    private serializeObject(object) {
        const result = [];

        for (const key in object) {
            result.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
        }
        return result.join('&');
    }

    private storeDataInMemoryCache(data, storeIn: ClassType<any>) {
        // // If we already have something for the storeIn key, let's transform storeIn has an array of results !
        // if (this.requestsResultCache.get(storeIn.name) !== undefined) {
        //     let copy = [];
        //     copy.push(data);
        //     copy.push(this.requestsResultCache.get(storeIn.name));
        //     data = copy;
        // }
        let objectToArray = [];
        if (data instanceof Array) {
            data.forEach((object) => {
                objectToArray.push(plainToClass(storeIn, object));
            });
            data = objectToArray;
        }

        this.requestsResultCache.set(storeIn.name, plainToClass(storeIn, data));
    }

    private getDataFromHttpClient(httpClientResponse): Array<any> {
        return httpClientResponse.body;
    }

    private getDataFromApiResponse(apiResponse): Array<any> {
        return apiResponse.data;
    }
}
