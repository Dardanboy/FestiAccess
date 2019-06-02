import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule} from '@ionic/storage';
// import { TestComponent } from './test/test.component';

import { HttpClientModule } from '@angular/common/http';
import {DataProvider} from '../providers/data';
import {FingerprintAIO, FingerprintOptions} from '@ionic-native/fingerprint-aio/ngx';
import {FingerprintMock} from './mocks/fingerprint-mock';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: FingerprintAIO, useClass: FingerprintMock},
        DataProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
