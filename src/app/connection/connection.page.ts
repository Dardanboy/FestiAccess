import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {DataProviderEnum} from '../../providers/data';
import {APIResource} from '../implements/apiresource';

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

                this.dataProvider.sendAndWaitResponse(DataProviderEnum.GET, this.apiResource(result))
                    .then((data) => {
                        console.log('connection data: ');
                        console.log(data);

                        this.stopLoading();
                    })
                    .catch((error: any) => {
                        console.log(error);
                        this.showMessage('Erreur: ' + error.message + '\nVeuillez ressayer ou contacter l\'administrateur', 7500);
                    });

            })
            .catch((error: any) => {
                console.log('error: ' + error);
                this.showMessage('Erreur: ' + error.message);
            });
    }

    apiResource(hash: string): string {
        return JSON.stringify({
                fingerPrintHash: hash
            }
        );
    }

}
