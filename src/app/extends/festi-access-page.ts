import {Router} from '@angular/router';
import {DataProvider} from '../../providers/data';
import {Navigation} from '../implements/navigation';
import {Injector} from '@angular/core';

export enum FestiAccessPageEnum {
    NoAPIUsage = 'NoAPIUsage'
}

export abstract class FestiAccessPage implements Navigation {
    protected API_URL = 'http://localhost/';
    protected API_PATH: string;
    private dataProvider: DataProvider;
    private router: Router;


    protected constructor(API_PATH: string, injector: Injector) {
        this.dataProvider = injector.get(DataProvider);
        this.router = injector.get(Router);

        if ((API_PATH !== null || API_PATH !== API.NoAPIUsage) && API_PATH[0] !== '/') {
            API_PATH.slice(0, 1);
        }

        this.API_PATH = API_PATH;
    }

    goTo(link): void {
        this.router.navigate([link]).then(() => {
            console.log('Going to page: ' + link);
        }).catch(() => {
            console.log('goTo for ' + link + ' didn\'t work');
        });
    }

}


