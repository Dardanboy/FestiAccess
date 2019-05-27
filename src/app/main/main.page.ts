import { Component, OnInit } from '@angular/core';
import {DataProvider } from '../../providers/data';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    private role: string;
    public dataProvider: DataProvider;

    constructor(private storage: Storage) {
        this.dataProvider = new DataProvider(storage);
    }

    ngOnInit() {
    }
}

