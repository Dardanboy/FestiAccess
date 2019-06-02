import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {DataProviderEnum} from '../../providers/data';
import {APIResource} from '../implements/apiresource';
import {json} from "@angular-devkit/core";

@Component({
    selector: 'app-connection',
    templateUrl: './connection.page.html',
    styleUrls: ['./connection.page.scss'],
})

export class ConnectionPage extends FestiAccessPage implements OnInit, APIResource {

    constructor(private fingerPrint: FingerprintAIO, injector: Injector) {
        super('/connection', injector);
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
                console.log('result: ' + result);
                this.dataProvider.sendAndWaitResponse(this.API_URL, this.API_PATH, DataProviderEnum.Post, this.apiResource(result));
            })
            .catch((error: any) => console.log('error: ' + error));

        //     sendAndWaitResponse(url, path, method: DataProviderEnum, data: string) {

    }

    apiResource(hash: string): string{
        return JSON.stringify({
                fingerPrintHash : hash
            }
        );
    }
}
