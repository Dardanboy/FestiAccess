import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';
import {DataProvider} from '../providers/data';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {FingerprintMock} from './mocks/fingerprint-mock';
import {LoadingService} from '../providers/loading';
import {ToastService} from '../providers/toast';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertControllerService} from '../providers/alertcontroller';
import {AuthGuardService} from './guards/auth-guard-service.guard';
import {DatePipe} from '@angular/common';
import {NetworkService} from '../providers/network';
import { Network } from '@ionic-native/network/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import {SettingsService} from '../providers/settings';
import {HttpRequestCacheContainer} from '../providers/httprequestcache';
import {SimulateNewApiOffline} from '../providers/simulateNewApiOffline';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: FingerprintAIO, useClass: FingerprintMock},
        DataProvider,
        LoadingService,
        ToastService,
        AlertControllerService,
        AuthGuardService,
        DatePipe,
        NetworkService,
        Network,
        AppVersion,
        SettingsService,
        SimulateNewApiOffline
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
