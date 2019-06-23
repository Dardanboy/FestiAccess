import {HttpRequestCache} from './HttpRequestCache';
import {Type} from 'class-transformer';

export class HttpRequestCacheManager {
    @Type(() => HttpRequestCache)
    protected allCache: HttpRequestCache[] = [];

    constructor() {
        this.allCache.push(new HttpRequestCache('test', 'test', {test: 'test'}, Date.now()));
    }
}
