import {Router} from '@angular/router';
import {DataProvider} from '../../providers/data';
import {Navigation} from '../implements/navigation';
import {Injector, OnInit} from '@angular/core';
import {LoadingService} from '../../providers/loading';
import {ToastService} from '../../providers/toast';
import {AlertControllerService} from '../../providers/alertcontroller';
import {ApiService} from '../../providers/api';
import {User} from '../models/User';
import {NavController} from '@ionic/angular';

export abstract class FestiAccessPage implements Navigation {
    protected dataProvider: DataProvider;
    protected router: Router;
    protected loadingService: LoadingService;
    protected toastService: ToastService;
    protected alertController: AlertControllerService;
    protected apiService: ApiService;
    protected navController: NavController;

    protected constructor(injector: Injector, API_PATH = null) {
        this.dataProvider = injector.get(DataProvider);
        this.router = injector.get(Router);
        this.loadingService = injector.get(LoadingService);
        this.toastService = injector.get(ToastService);
        this.alertController = injector.get(AlertControllerService);
        this.navController = injector.get(NavController);

        this.apiService = new ApiService();

        if (API_PATH !== null) {
            this.apiService.API_PATH = API_PATH;
        }

        if (!this.isUserAlreadyConnected()) {
            this.backHome();
        }
    }

    /**
     * It is used to know if the page just accessed can be shown
     * For that, user must be connected and for that we check if there is some data about user in the cache (memory)
     * We don't do the check on pages where the user is not connected yet like home and connection page
     */
    isUserAlreadyConnected() {
        let actualPage = this.router.url;
        if (actualPage === '/home' || actualPage === '/connection') {
            return true;
        }

        console.log(this.dataProvider);
        let userCache = this.dataProvider.getFromCache(User);

        if (userCache === undefined || userCache === null) {
            return false;
        }

        return true;
    }

    goTo(link): void {
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
        console.log('showAlert');
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


