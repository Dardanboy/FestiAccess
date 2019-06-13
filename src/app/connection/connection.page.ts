import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {DataProviderEnum} from '../../providers/data';
import {APIResource} from '../implements/apiresource';
import {User} from '../models/User';

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

                this.dataProvider.sendAndWaitResponse(this.apiService, DataProviderEnum.POST, this.apiResource(result), User)
                    .then((data) => {
                        console.log('connection data: ');
                        console.log(data);
                        this.goTo('tabs');
                    })
                    .catch((error: any) => {
                        if (error.status === 401 && error.error.message === 'AUTHENTIFICATION_FAIL'){
                            this.showMessage(
                                'Erreur: Impossible de reconnaître votre empreinte.\n' +
                                'Êtes-vous inscrit ? Si oui, veuillez ressayer, si non veuillez vous inscrire depuis la page d\'accueil'
                                , 8000);
                        } else {
                            this.showMessage('Erreur: ' + error.message + '\nVeuillez ressayer ou contacter l\'administrateur', 7500);
                        }
                    })
                    .finally(() => {
                        this.stopLoading();
                    });

            })
            .catch((error: any) => {
                console.log('error: ' + error);
                this.showMessage('Erreur: ' + error.message);
            });
    }

    apiResource(hash: string): object {
        return {
            fingerPrintHash: hash
        };
    }

}
