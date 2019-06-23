import {Router} from '@angular/router';
import {DataProvider} from '../../providers/data';
import {Navigation} from '../implements/navigation';
import {Injector} from '@angular/core';
import {LoadingService} from '../../providers/loading';
import {ToastService} from '../../providers/toast';
import {AlertControllerService} from '../../providers/alertcontroller';
import {ApiService} from '../../providers/api';
import {NavController} from '@ionic/angular';
import {DatePipe, formatDate, Location} from '@angular/common';
import {NetworkService} from '../../providers/network';
import {SettingsService} from '../../providers/settings';
import {HttpRequestCache} from "../models/HttpRequestCache";


export abstract class FestiAccessPage implements Navigation {
    static passedInIt = false;
    protected dataProvider: DataProvider;
    protected router: Router;
    protected loadingService: LoadingService;
    protected toastService: ToastService;
    protected alertController: AlertControllerService;
    protected apiService: ApiService;
    protected navController: NavController;
    protected datePipe: DatePipe;
    protected location: Location;
    protected network: NetworkService;
    protected settings: SettingsService;

    /**
     * Used for offline mode
     */
    protected offlineMode: boolean;
    // Contains the last information asked in offline mode (returned by storage)
    protected shownOfflineElementsData: HttpRequestCache;

    protected constructor(injector: Injector, API_PATH = null) {
        this.dataProvider = injector.get(DataProvider);
        this.router = injector.get(Router);
        this.loadingService = injector.get(LoadingService);
        this.toastService = injector.get(ToastService);
        this.alertController = injector.get(AlertControllerService);
        this.navController = injector.get(NavController);
        this.datePipe = injector.get(DatePipe);
        this.location = injector.get(Location);
        this.network = injector.get(NetworkService);
        this.settings = injector.get(SettingsService);


        this.apiService = new ApiService();

        if (API_PATH !== null) {
            this.apiService.API_PATH = API_PATH;
        }


        if (!FestiAccessPage.passedInIt) {
            console.log('Passed');
            FestiAccessPage.passedInIt = true;
            /**
             * Get instantly changes to the settings by using BehaviourSubject/Observer
             */
            this.settings.getSettingBehaviour().subscribe((setting) => {
                if (setting.apiLink !== null && setting.apiLink !== undefined) {
                    this.apiService.API_URL = setting.apiLink;
                }

                if (setting.offlineMode !== null && setting.offlineMode !== undefined) {
                    this.dataProvider.offlineMode = setting.offlineMode;
                    this.offlineMode = setting.offlineMode;
                }
            });

            /**
             * Get instantly changes on offline mode that are given by DataProvider
             */
            this.dataProvider.getActualInfoBehaviour().subscribe((data) => {
                if (data !== null) {
                    console.log('shownOfflineElements:');
                    console.log(data);
                    this.shownOfflineElementsData = data as HttpRequestCache;
                    // @ts-ignore
                    this.showMessage('Ces données proviennent de votre cache hors-ligne. Elles datent du '
                        + formatDate(this.shownOfflineElementsData.timestamp, 'short', 'en-US'), 3500);
                }
            });
        }
    }

    goTo(link, params: number = null): void {
        this.router.navigate(['/' + link + ((params !== null && params !== undefined) ? '/' + params.toString() : '')])
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

    goBack() {
        this.location.back();
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

    showAlertForOfflineMode() {
        this.showAlert('Mode hors-ligne',
            'Vous êtes actuellement hors-ligne. ' +
            'Les données que vous voyez ne sont pas synchronisées et proviennent des dernières données récupérées en ligne. Certaines données risquent de n\'avoir jamais été récupérées et sont donc indisponibles.',
            [{
                text: 'J\'ai compris',
                action: () => {

                }
            }]);
    }
}


