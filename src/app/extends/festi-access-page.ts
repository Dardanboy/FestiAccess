import {Router} from '@angular/router';
import {DataProvider} from '../../providers/data';
import {Navigation} from '../implements/navigation';
import {Injector} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {LoadingService} from "../../providers/loading";

export enum FestiAccessPageEnum {
    NoAPIUsage = 'NoAPIUsage'
}

export abstract class FestiAccessPage implements Navigation {
    protected API_URL = 'http://localhost/';
    protected API_PATH: string;
    protected dataProvider: DataProvider;
    protected router: Router;
    protected loadingService: LoadingService;

    protected constructor(API_PATH: string, injector: Injector) {
        this.dataProvider = injector.get(DataProvider);
        this.router = injector.get(Router);
        this.loadingService = injector.get(LoadingService);

        if ((API_PATH !== null || API_PATH !== FestiAccessPageEnum.NoAPIUsage) && API_PATH[0] !== '/') {
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

    async presentLoading() {
        this.loadingService.present();
    }

    async stopLoading() {
        this.loadingService.dismiss();
    }
}


