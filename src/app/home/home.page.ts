import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {ConnectedUser} from '../models/ConnectedUser';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage extends FestiAccessPage implements OnInit {

    constructor(injector: Injector) {
        super(injector);
        this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser).then((data) => {
            this.goTo('tabs');
        });
    }

    ngOnInit() {

    }

}
