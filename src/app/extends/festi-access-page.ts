import {Router} from '@angular/router';
import {DataProvider} from '../../providers/data';
import {Navigation} from '../implements/navigation';
import {Injector} from '@angular/core';
import {LoadingService} from '../../providers/loading';
import {ToastService} from '../../providers/toast';
import {AlertControllerService} from '../../providers/alertcontroller';
import {ApiService} from '../../providers/api';
import {NavController} from '@ionic/angular';
import {DatePipe} from '@angular/common';


export abstract class FestiAccessPage implements Navigation {
    protected dataProvider: DataProvider;
    protected router: Router;
    protected loadingService: LoadingService;
    protected toastService: ToastService;
    protected alertController: AlertControllerService;
    protected apiService: ApiService;
    protected navController: NavController;
    protected datePipe: DatePipe;

    protected constructor(injector: Injector, API_PATH = null) {
        this.dataProvider = injector.get(DataProvider);
        this.router = injector.get(Router);
        this.loadingService = injector.get(LoadingService);
        this.toastService = injector.get(ToastService);
        this.alertController = injector.get(AlertControllerService);
        this.navController = injector.get(NavController);
        this.datePipe = injector.get(DatePipe);

        this.apiService = new ApiService();

        if (API_PATH !== null) {
            this.apiService.API_PATH = API_PATH;
        }
    }

    goTo(link, params: Array<any> | string = null): void {
        this.router.navigate(['/' + link])
            .then(() => {
                console.log('Going to page: ' + link);
            })
            .catch(() => {
                console.log('goTo for ' + link + ' didn\'t work');
            });
    }

    backHome() {
        this.goTo('home');
    }

    startLoading() {
        this.loadingService.present().then();
    }

    stopLoading() {
        this.loadingService.dismiss().then();
    }

    showMessage(message: string, duration: number = 2000, buttons: Array<any> = null) {
        let buttonsObject = [];
        if (buttons !== null) {
            buttons.forEach((object) => {
                buttonsObject.push({
                    text: object.text,
                    handler: object.action
                });
            });
        }

        this.toastService.presentToast(message, duration, buttonsObject).then();
    }

    showAlert(title: string, message: string, buttons: Array<any> = null) {

        let buttonsObject = [];
        if (buttons !== null) {
            buttons.forEach((object) => {
                buttonsObject.push({
                    text: object.text,
                    handler: object.action
                });
            });
        }

        this.alertController.presentAlert(title, message, buttonsObject).then();
    }
}


