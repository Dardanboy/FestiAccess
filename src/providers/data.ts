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
    DELETE = 'delete',
}

@Injectable()
export class DataProvider {
    private requestsResultCache: Map<string, any>;

    constructor(private storage: Storage, private http: HttpClient) {
        this.requestsResultCache = new Map<string, any>();
    }

    get apiService(): ApiService {
        return this.apiService;
    }

    /**
     * Called for a get request. If needed, the result is put into the memory cache by providing a ClassType
     * @param apiService
     * @param storeIn
     */
    public httpGetRequest(apiService: ApiService, storeIn: ClassType<any> = null): Promise<any> {
        return this.httpRequestAndWaitResponse(apiService, DataProviderEnum.GET, null, storeIn);
    }

    /**
     * Called for a delete request. If needed, the result is put into the memory cache by providing a ClassType
     * @param apiService
     * @param storeIn
     */
    public httpDeleteRequest(apiService: ApiService, storeIn: ClassType<any> = null): Promise<any> {
        return this.httpRequestAndWaitResponse(apiService, DataProviderEnum.DELETE, null, storeIn);
    }

    /**
     * Called for a post request. If needed, the result is put into the memory cache by providing a ClassType
     * @param apiService
     * @param data
     * @param storeIn
     */
    public httpPostRequest(apiService: ApiService, data: any, storeIn: ClassType<any> = null): Promise<any> {
        return this.httpRequestAndWaitResponse(apiService, DataProviderEnum.POST, data, storeIn);
    }

    /*
     * Send a request to the API and wait for the response.
     */
    private httpRequestAndWaitResponse(apiService: ApiService, method: DataProviderEnum, data: any, storeIn: ClassType<any>): Promise<any> {

        let promise = null;

        if (method === DataProviderEnum.POST || method === DataProviderEnum.PUT) {
            if (typeof data === 'object') {
                data = this.serializeObject(data);
            }
            // this.http[method] is the method called on http class. It can be this.http.post or this.http.put here
            promise = this.http[method](
                apiService.fullUrl(),
                data,
                {observe: 'response', headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
            ).toPromise();

        } else { // Get and Delete requests
            if (data !== null && (data.id !== null || data.id !== undefined)) {
                apiService.API_PATH = apiService.API_PATH + '/' + data.id;
            }
            // this.http[method] is the method called on http class. It can be this.http.get or this.http.delete here
            promise = this.http[method](apiService.fullUrl(), {observe: 'response'}).toPromise();
        }

        promise.then((response) => {
            if (storeIn !== null) {
                console.log('response:');
                console.log(response);
                console.log('getDataFromHttpResponse:');
                console.log(this.getDataFromHttpResponse(response));

                if (this.getDataFromHttpResponse(response) !== null && this.getDataFromApiResponse(this.getDataFromHttpResponse(response)).length > 0) {
                    this.storeDataInMemoryCache(this.getDataFromApiResponse(this.getDataFromHttpResponse(response)), storeIn);
                } else {
                    throw Error('No data received from server, so impossible to store this data in the cache (' + storeIn.name + ')');
                }
            }
        });

        return promise;
    }

    /**
     *
     * @param storedIn
     * @param forceAloneResultReturnWithoutArray is used when the result of requestResultCache.get is only one object.
     *                                           In this case only the object itself will be returned and not included in an array and thus the "[0]" of
     *                                           getFromCache()[0] won't be needed
     */
    getFromCache(storedIn: ClassType<any>, forceAloneResultReturnWithoutArray: boolean = true): any {
        if (!this.requestsResultCache.has(storedIn.name)) {
            return null;
        }

        console.log('entries:');
        console.log(this.requestsResultCache.entries());
        let res = this.requestsResultCache.get(storedIn.name);
        if (forceAloneResultReturnWithoutArray && res.length === 1) {
            res = res[0];
        }

        return (res !== null || res !== undefined) ? res : null;
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
        const objectToArray = [];
        if (data instanceof Array) {
            data.forEach((object) => {
                objectToArray.push(plainToClass(storeIn, object));
            });
            data = objectToArray;
        }

        console.log('set');
        console.log('data:');
        console.log(data);
        console.log('plainToClass:');
        console.log(plainToClass(storeIn, data));
        this.requestsResultCache.set(storeIn.name, plainToClass(storeIn, data));

    }

    private getDataFromHttpResponse(httpClientResponse): Array<any> {
        return httpClientResponse.body;
    }

    private getDataFromApiResponse(apiResponse): Array<any> {
        return apiResponse.data;
    }
}
