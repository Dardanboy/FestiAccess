import {Injectable} from '@angular/core';

@Injectable()
export class ApiService {
    static API_URL = 'http://localhost:8000/';
    private _API_PATH: string;

    get API_URL(): string {
        return ApiService.API_URL;
    }

    set API_URL(value: string) {
        ApiService.API_URL = this.formatAsDomainName(value);
    }

    get API_PATH(): string {
        return this._API_PATH;
    }

    set API_PATH(value: string) {
        this._API_PATH = this.formatAsPath(value);
    }

    formatAsDomainName(toFormat): string {
        let format = toFormat;
        if (format !== null && format[format.length - 1] !== '/') {
            format += '/';
        }

        return format;
    }

    formatAsPath(toFormat): string {
        let format = toFormat;
        if (format !== null && format[0] === '/') {
            format = format.slice(1);
        }

        return format;
    }

    fullUrl() {
        ApiService.API_URL = this.formatAsDomainName(ApiService.API_URL);
        this.API_PATH = this.formatAsPath(this.API_PATH);

        return this.API_URL + this.API_PATH;
    }
}
