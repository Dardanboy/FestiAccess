import {HttpRequestCache} from './HttpRequestCache';
import {Type} from 'class-transformer';
import {DatePipe, formatDate} from "@angular/common";

export class HttpRequestCacheManager {
    // The key (string) will contain the link, the second will contain the HTTP type of request (GET ...) and the object will contain the data
    @Type(() => HttpRequestCache)
    allCache: HttpRequestCache[] = [];

    addHttpCache(url: string, requestType: string, data: object) {
        // This is a bad idea to use O(n) loops but for now it's ok (time..)
        // TODO: Replace the forEach with an associative array ( O(1) access )
        let contains = false;
        let positionContains = 0;
        this.allCache.forEach((value, index) => {
            if (value.link === url && value.type === requestType) {
                contains = true;
                positionContains = index;
            }
        });

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
        this.allCache.forEach((value, index) => {
            if (value.link === url && value.type === requestType) {
                response = value;
            }
        });

        return response;
    }
}
