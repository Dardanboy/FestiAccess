import {DatePipe} from '@angular/common';

export class HttpRequestCache {
    link: string; // Link to the request (full link)
    type: string; // The http request type (GET/POST...)
    data: object; // The response returned by the request
    timestamp: number;

    // The key (string) will contain the link, the second will contain the HTTP type of request (GET ...) and the object will contain the data
    constructor(link: string, type: string, data: object, timestamp: number) {
        this.link = link;
        this.type = type;
        this.data = data;
        this.timestamp = timestamp;
    }
}
