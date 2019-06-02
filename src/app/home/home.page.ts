import {Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {DataProvider} from '../../providers/data';
import { Router} from '@angular/router';
import { Navigation } from '../implements/navigation';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, Navigation {
    private data: DataProvider;

    constructor(private storage: Storage, router: Router, dataProvider: DataProvider) {
        this.data = dataProvider;
    }

    ngOnInit() {

    }

    goTo(link: string): void {
    }
}
