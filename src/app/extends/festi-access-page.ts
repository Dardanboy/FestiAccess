import {Router} from '@angular/router';
import {DataProvider} from '../../providers/data';
import {Navigation} from '../implements/navigation';
import {Injector} from '@angular/core';
import {LoadingService} from '../../providers/loading';

export abstract class FestiAccessPage implements Navigation {
    protected dataProvider: DataProvider;
    protected router: Router;
    protected loadingService: LoadingService;

    protected constructor(injector: Injector, API_PATH = null) {
        this.dataProvider = injector.get(DataProvider);
        this.router = injector.get(Router);
        this.loadingService = injector.get(LoadingService);

        if (API_PATH !== null) {
            this.dataProvider.apiService.API_PATH = API_PATH;
        }
    }

    goTo(link): void {
        this.router.navigate([link]).then(() => {
            console.log('Going to page: ' + link);
        }).catch(() => {
            console.log('goTo for ' + link + ' didn\'t work');
        });
    }

    async startLoading() {
        return this.loadingService.present();
    }

    async stopLoading() {
        return this.loadingService.dismiss();
    }
}


