import { Router } from '@angular/router';
import {DataProvider} from '../../providers/data';
import {Router} from '@angular/router';

export abstract class FestiAccessPage {
    protected API_URL: string;
    protected API_PATH: string;

    protected constructor(API_PATH: string, router: Router, dataProvider: DataProvider) {
        this.API_URL = 'http://localhost/';
        if (API_PATH[0] === '/') {
            API_PATH.slice(0, 1);
        }
        this.API_PATH = API_PATH;
    }

    protected goTo() {

    }
}
