import {Injectable} from '@angular/core';
import {FestiAccessPageEnum} from "../app/extends/festi-access-page";


@Injectable()
export class ApiService {
    private _API_URL = 'http://localhost/';
    private _API_PATH: string;

    get API_URL(): string {
        return this._API_URL;
    }

    set API_URL(value: string) {
        this._API_URL = value;
    }

    get API_PATH(): string {
        return this._API_PATH;
    }

    set API_PATH(value: string) {
        if ((value !== null || value !== FestiAccessPageEnum.NoAPIUsage) && value[0] !== '/') {
            value.slice(0, 1);
        }
        this._API_PATH = value;
    }
}
