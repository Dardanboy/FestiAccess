import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {DataProviderStorageEnum} from '../../providers/data';
import {APIResource} from '../implements/apiresource';
import {ConnectedUser} from '../models/ConnectedUser';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.page.html',
    styleUrls: ['./connection.page.scss'],
})

export class ConnectionPage extends FestiAccessPage implements OnInit, APIResource {

    constructor(private fingerPrint: FingerprintAIO, injector: Injector) {
        super(injector, '/api/dii/connection');
    }

    ngOnInit() {

    }

    connect() {

        this.fingerPrint.show({
            clientId: 'FestiAccess',
            clientSecret: 'o7aoOMYUbyxaD23oFAnJ',
            disableBackup: true,
            localizedFallbackTitle: 'FestiAccess authentication',
            localizedReason: 'FestiAccess authentication'
        })
            .then((result: any) => {
                this.startLoading();

                this.dataProvider.httpPostRequest(this.apiService, this.apiResource(result), ConnectedUser, DataProviderStorageEnum.STORE_IN_STORAGE)
                    .then((data) => {
                        if (data !== null) {
                            this.goTo('tabs');
                        } else {

                        }
                    })
                    .catch((error: any) => {

                        if (error.status === 401 && error.error.message === 'AUTHENTIFICATION_FAIL') {
                            this.showMessage(
                                '[Connection:45] Erreur: Impossible de reconnaître votre empreinte.\n' +
                                'Êtes-vous inscrit ? Si oui, veuillez ressayer, si non veuillez vous inscrire depuis la page d\'accueil'
                                , 8000);
                        } else {
                            let message = null;
                            if (error.message !== undefined && error.message !== null) {
                                message = error.message;
                            } else {
                                message = error;
                            }
                            this.showMessage('[Connection:49] Erreur: ' + message +
                                '\nVeuillez ressayer ou contacter l\'administrateur', 7500);
                        }
                    })
                    .finally(() => {

                        this.stopLoading();
                    });

            })
            .catch((error: any) => {
                console.log('error: ' + error);
                this.showMessage('[Connection:60] Erreur: ' + error.message);
            });
    }

    apiResource(hash: string): object {
        return {
            fingerPrintHash: hash
        };
    }

}
