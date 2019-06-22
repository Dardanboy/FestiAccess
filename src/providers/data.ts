import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from './api';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {ClassType} from 'class-transformer/ClassTransformer';
import {HttpRequestCacheManager} from '../app/models/HttpRequestCacheManager';
import {NetworkService} from "./network";

export enum DataProviderEnum {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export enum DataProviderStorageEnum {
    DONT_STORE_IN_STORAGE = 'DONT_STORE_IN_STORAGE',
    STORE_IN_STORAGE = 'STORE_IN_STORAGE',
}

export enum ConnectionStatusEnum {
    Online,
    Offline
}

@Injectable()
export class DataProvider {
    private requestsResultCache: Map<string, any>;
    private httpRequestCacheManager: HttpRequestCacheManager;

    constructor(private storage: Storage, private http: HttpClient, private networkService: NetworkService) {
        this.requestsResultCache = new Map<string, any>();
        this.initializeHttpRequestCacheWithStorageData();

        this.networkService.network.onDisconnect().subscribe(() => {
            console.log('disconnected');
        });

        this.networkService.network.onConnect().subscribe(() => {
            console.log('connected');
        });
    }

    /**
     * Called for a get request. If needed, the result is put into the memory cache by providing a ClassType
     * @param apiService
     * @param storeInStorage
     * @param storeIn
     */
    public httpGetRequest(apiService: ApiService, storeIn: ClassType<any> = null, storeInStorage: DataProviderStorageEnum = DataProviderStorageEnum.DONT_STORE_IN_STORAGE): Promise<any> {
        return this.httpRequestAndWaitResponse(apiService, DataProviderEnum.GET, null, storeIn, storeInStorage);
    }

    /**
     * Called for a delete request. If needed, the result is put into the memory cache by providing a ClassType
     * @param apiService
     * @param storeInStorage
     * @param storeIn
     */
    public httpDeleteRequest(apiService: ApiService, storeIn: ClassType<any> = null, storeInStorage: DataProviderStorageEnum = DataProviderStorageEnum.DONT_STORE_IN_STORAGE): Promise<any> {
        return this.httpRequestAndWaitResponse(apiService, DataProviderEnum.DELETE, null, storeIn, storeInStorage);
    }

    /**
     * Called for a post request. If needed, the result is put into the memory cache by providing a ClassType
     * @param apiService
     * @param data
     * @param storeInStorage
     * @param storeIn
     */
    public httpPostRequest(apiService: ApiService, data: any, storeIn: ClassType<any> = null, storeInStorage: DataProviderStorageEnum = DataProviderStorageEnum.DONT_STORE_IN_STORAGE): Promise<any> {
        return this.httpRequestAndWaitResponse(apiService, DataProviderEnum.POST, data, storeIn, storeInStorage);
    }

    /*
     * Send a request to the API and wait for the response.
     */
    private httpRequestAndWaitResponse(apiService: ApiService, method: DataProviderEnum, data: any, storeIn: ClassType<any>, storeInStorage: DataProviderStorageEnum): Promise<any> {
        let promise = null;
        if (this.networkService.isConnected && this.networkService.network.type !== 'none') {
            console.log('IS CONNECTED');
            if (method === DataProviderEnum.POST || method === DataProviderEnum.PUT) {
                if (typeof data === 'object') {
                    data = this.serializeObject(data);
                }
                // this.http[method] is the method called on http class. It can be this.http.post or this.http.put here
                promise = this.http[method](
                    apiService.fullUrl(),
                    data,
                    {
                        observe: 'response',
                        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
                    }
                ).toPromise();

            } else { // Get and Delete requests
                // this.http[method] is the method called on http class. It can be this.http.get or this.http.delete here
                promise = this.http[method](apiService.fullUrl(), {observe: 'response'}).toPromise();
            }
        } else { // NO CONNECTION
            console.log('IS NOT CONNECTED');

            /**
             * No connection, no chocolate.
             * Here we just get what's put in the local cache (in HttpRequestCacheManager)
             */
            console.log('what\' returned by getHttpResponseFromCache ?:');
            console.log(this.getHttpResponseFromCache(apiService.fullUrl(), method));

            promise = new Promise((resolve) => {
                let httpData = this.getHttpResponseFromCache(apiService.fullUrl(), method);
                resolve(httpData.data);
            });
        }

        promise.then((response) => {
            console.log('response: ' + response);
            console.log(response);
            if (storeIn !== null) {
                if (this.getDataFromHttpResponse(response) !== null &&
                    this.getDataFromApiResponse(this.getDataFromHttpResponse(response)).length > 0) {

                    /**
                     * Store in memory cache
                     */
                    this.storeDataInMemoryCache(this.getDataFromApiResponse(this.getDataFromHttpResponse(response)), storeIn);

                    /**
                     *  Store response in storage cache
                     */
                    this.storeDataInStorage(this.getDataFromApiResponse(this.getDataFromHttpResponse(response)), storeIn);

                    /**
                     *  Add all requests in HttpRequestCache (by using HttpRequestCacher)
                     *  Store this HttpRequestCache into the storage cache
                     */
                    this.httpRequestCacheManager.addHttpCache(apiService.fullUrl(), method, response);
                    this.storeDataInStorage(this.httpRequestCacheManager.allCache, HttpRequestCacheManager);


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
     *                                           getFromMemoryCache()[0] won't be needed
     */
    private getFromMemoryCache(storedIn: ClassType<any>, forceAloneResultReturnWithoutArray: boolean = true): any {
        if (!this.requestsResultCache.has(storedIn.name)) {
            console.log('return null !');
            return null;
        }

        console.log('entries:');
        console.log(this.requestsResultCache.entries());
        let res = this.requestsResultCache.get(storedIn.name);

        if (forceAloneResultReturnWithoutArray && res.length === 1) {
            console.log('Going to return first');
            res = res[0];
        }

        return (res !== null || res !== undefined) ? res : null;
    }

    /**
     *
     * @param storedIn
     * @param forceAloneResultReturnWithoutArray
     */
    private async getFromStorageCache(storedIn: ClassType<any>, forceAloneResultReturnWithoutArray: boolean = true): Promise<any> {
        let res = await this.storage.get(storedIn.name);
        console.log('resultat getFromStorageCache:');
        console.log(res);
        if (res === null) {
            console.log('res === null');
            return null;
        }

        if (forceAloneResultReturnWithoutArray && res.length === 1) {
            console.log('Going to return first');
            res = res[0];
        }

        return (res !== null || res !== undefined) ? res : null;
    }

    /**
     * This will return data that are stored into cache or memory.
     * The memory will have the prevalence on the storage.
     * When only storage has data, the data from storage will be put into the memory cache
     * @param storedIn
     */
    async getFromMemoryOrStorageCache(storedIn: ClassType<any>): Promise<any> {
        let result = this.getFromMemoryCache(storedIn);
        console.log('typeof result:');
        console.log(typeof result);

        if (result !== null) {
            return await Promise.resolve(plainToClass(storedIn, result));
        }

        result = await this.getFromStorageCache(storedIn);

        console.log('data result getFromStorageCache: ' + result);
        if (result === null) {
            console.log('result === null getFromStorageCache');
            return await Promise.resolve(null);
        }
        // Let's put result into memory cache
        // this.storeDataInMemoryCache(result, storedIn);

        return await Promise.resolve(plainToClass(storedIn, result));
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

    private storeDataInStorage(data, storeIn: ClassType<any>) {
        const objectToArray = [];
        if (data instanceof Array) {
            data.forEach((object) => {
                objectToArray.push(plainToClass(storeIn, object));
            });
            data = objectToArray;
        }

        this.storage.ready().then(() => {
            this.storage.set(storeIn.name, data).then(() => {
                console.log('data stored in storage for: ' + storeIn.name);
            });
        });
    }

    private getDataFromHttpResponse(httpClientResponse): Array<any> {
        return httpClientResponse.body;
    }

    private getDataFromApiResponse(apiResponse): Array<any> {
        return apiResponse.data;
    }

    private initializeHttpRequestCacheWithStorageData() {
        this.httpRequestCacheManager = new HttpRequestCacheManager();
        this.getFromMemoryOrStorageCache(HttpRequestCacheManager).then((data) => {
            console.log('data for httpRequestCacheManager:');
            if (data !== null) {
                this.httpRequestCacheManager = plainToClass(HttpRequestCacheManager, data);
                console.log('httpRequestCacheManager:');
                console.log(this.httpRequestCacheManager);
            }
        });
    }

    private getHttpResponseFromCache(url: string, requestType: string) {
        return this.httpRequestCacheManager.getHttpCache(url, requestType);
    }

}
