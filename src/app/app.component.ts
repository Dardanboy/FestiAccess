import {Component, Injector} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FestiAccessPage} from './extends/festi-access-page';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent extends FestiAccessPage {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        injector: Injector
    ) {
        super(injector);
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
