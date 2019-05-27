import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {DataProvider} from '../../providers/data';
import {Router} from '@angular/router';
import { Navigation } from '../implements/navigation'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage extends Navigation {
    private dataProvider: DataProvider;

    constructor(private storage: Storage, router: Router) {
        super(router);
        this.dataProvider = new DataProvider(storage);
    }


}


