import {HttpRequestCacheManager} from '../app/models/HttpRequestCacheManager';
import {HttpRequestCache} from '../app/models/HttpRequestCache';
import {DataProvider} from './data';

export class HttpRequestCacheContainer extends HttpRequestCacheManager {

    constructor(private _dataProvider: DataProvider) {
        super();
        this.allCache = new Array<HttpRequestCache>();

        // Let's take all what's already in the storage and assign it to httpRequestCacheManager
        this._dataProvider.getFromMemoryOrStorageCache(HttpRequestCacheManager)
            .then((cache) => {
                if (cache !== null) {
                    this.allCache = cache;
                }
            });
    }

    addHttpCache(url: string, requestType: string, data: object) {
        // This is a bad idea to use O(n) loops but for now it's ok (time..)
        // TODO: Replace the forEach with an associative array ( O(1) access )
        let contains = false;
        let positionContains = 0;

        if (this.allCache !== null &&
            this.allCache !== undefined &&
            this.allCache.length > 0) {

            this.allCache.forEach((value, index) => {
                if (value.link === url && value.type === requestType) {
                    contains = true;
                    positionContains = index;
                }
            });
        }

        if (!contains) {
            this.allCache.push(new HttpRequestCache(url, requestType, data, Date.now()));
        } else {
            this.allCache[positionContains].data = data;
            this.allCache[positionContains].timestamp = Date.now();
        }
    }

    getHttpCache(url: string, requestType: string) {
        // Bad idea to use O(n) loops but for now it's ok (time..)
        // TODO: Replace the forEach with an associative array ( O(1) access )
        let response = null;

        if (this.allCache !== null &&
            this.allCache !== undefined &&
            this.allCache.length > 0) {

            this.allCache.forEach((value, index) => {
                if (value.link === url && value.type === requestType) {
                    response = value;
                }
            });
        }

        return response;
    }

    getAllCache() {
        return this.allCache;
    }
}
