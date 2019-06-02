import { Component, OnInit } from '@angular/core';
import {DataProvider } from '../../providers/data';
import { Storage } from '@ionic/storage';
import { Navigation } from '../implements/navigation';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements Navigation {
    private role: string;
    public data: DataProvider;

    constructor(private storage: Storage, dataProvider: DataProvider) {
        this.data = dataProvider;
    }

    goTo(link: string): void {

    }

}

