import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {User} from '../models/User';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage extends FestiAccessPage implements OnInit {
    private user: User;

    constructor(injector: Injector) {
        super(injector);

    }

    ngOnInit(): void {
        this.user = this.dataProvider.getFromCache(User)[0];
    }

}

