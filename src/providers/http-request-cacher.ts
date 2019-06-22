import {Injectable} from '@angular/core';
import {HttpRequestCache} from '../app/models/HttpRequestCache';
import {HttpRequestCacheManager} from '../app/models/HttpRequestCacheManager';

@Injectable()
export class HttpRequestCacher {
    private _httpRequestCacheManager: HttpRequestCacheManager;

    constructor() {

    }

    /**
     * @param url
     * @param requestType will contain HTTP request type (GET ...)
     * @param data
     */
    addHttpCache(url: string, requestType: string, data: object) {
        let map = new Map<string, Map<string, object>>().set(url, new Map<string, object>().set(requestType, data));
        this._httpRequestCacheManager.allCache.push(new HttpRequestCache(map));
    }
}
