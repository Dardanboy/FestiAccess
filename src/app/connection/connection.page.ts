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
        super(injector, '/connection');
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
        }).then((result: any) => {
            this.startLoading().then(() => console.log('startLoading'));
            console.log('result: ' + result);

            this.dataProvider.sendAndWaitResponse(
                this.dataProvider.apiService.API_URL,
                this.dataProvider.apiService.API_PATH,
                DataProviderEnum.Post,
                this.apiResource(result));

            this.stopLoading().then(() => console.log('stopLoading'));
        }).catch((error: any) => {
            console.log('error: ' + error);
        });
    }

    apiResource(hash: string): string {
        return JSON.stringify({
                fingerPrintHash: hash
            }
        );
    }

}
