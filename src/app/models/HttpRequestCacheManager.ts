import {HttpRequestCache} from './HttpRequestCache';
import {Type} from 'class-transformer';

export class HttpRequestCacheManager {
    @Type(() => HttpRequestCache)
    listOfHttpRequestCache: HttpRequestCache[] = [];
}
