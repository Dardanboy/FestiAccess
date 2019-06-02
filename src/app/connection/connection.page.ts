import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";

@Component({
    selector: 'app-connection',
    templateUrl: './connection.page.html',
    styleUrls: ['./connection.page.scss'],
})

export class ConnectionPage extends FestiAccessPage implements OnInit {

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
            .then((result: any) => console.log('result: ' + result))
            .catch((error: any) => console.log('error: ' + error));
    }
}
