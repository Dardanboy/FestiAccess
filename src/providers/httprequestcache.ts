import {HttpRequestCacheManager} from '../app/models/HttpRequestCacheManager';
import {HttpRequestCache} from '../app/models/HttpRequestCache';
import {DataProvider} from './data';

export class HttpRequestCacheContainer {
    cacheManager: HttpRequestCacheManager;

    constructor(private _dataProvider: DataProvider) {
        this.cacheManager = new HttpRequestCacheManager();
        // Let's take all what's already in the storage and assign it to httpRequestCacheManager
        this._dataProvider.getFromMemoryOrStorageCache(HttpRequestCacheManager)
            .then((cacheManager) => {
                if (cacheManager !== null) {
                    console.log('cacheManager returned: ');
                    console.log(cacheManager);
                    this.cacheManager = cacheManager;
                    console.log('output:');
                    console.log(this.cacheManager.listOfHttpRequestCache);
                } else {
                    throw Error('[HttpRequestCacheContainer]: Error cachemanager is null');
                }
            });
    }

    addHttpCache(url: string, requestType: string, data: object) {
        // This is a bad idea to use O(n) loops but for now it's ok (time..)
        // TODO: Replace the forEach with an associative array ( O(1) access )
        let contains = false;
        let positionContains = 0;

        if (this.cacheManager.listOfHttpRequestCache.length > 0) {
            this.cacheManager.listOfHttpRequestCache.forEach((value, index) => {
                if (value.link === url && value.type === requestType) {
                    contains = true;
                    positionContains = index;
                }
            });
        }

        if (!contains) {
            console.log('what the hell');
            console.log(this.cacheManager.listOfHttpRequestCache);
            this.cacheManager.listOfHttpRequestCache.push(new HttpRequestCache(url, requestType, data, Date.now()));
        } else {
            this.cacheManager.listOfHttpRequestCache[positionContains].data = data;
            this.cacheManager.listOfHttpRequestCache[positionContains].timestamp = Date.now();
        }
    }

    getHttpCache(url: string, requestType: string) {
        // Bad idea to use O(n) loops but for now it's ok (time..)
        // TODO: Replace the forEach with an associative array ( O(1) access )
        let response = null;

        if (this.cacheManager.listOfHttpRequestCache !== null &&
            this.cacheManager.listOfHttpRequestCache !== undefined &&
            this.cacheManager.listOfHttpRequestCache.length > 0) {

            this.cacheManager.listOfHttpRequestCache.forEach((value) => {
                if (value.link === url && value.type === requestType) {
                    response = value;
                }
            });
        }

        return response;
    }

    getAllCache() {
        console.log('returning getAllCache: ');
        console.log(this.cacheManager.listOfHttpRequestCache);
        return this.cacheManager.listOfHttpRequestCache;
    }

    getObject(): object {
        return JSON.parse(JSON.stringify(this.cacheManager));
    }
}
