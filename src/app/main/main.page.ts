import {AfterContentInit, Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {User} from '../models/User';
import {ConnectedUser} from "../models/ConnectedUser";

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage extends FestiAccessPage implements OnInit {
    user: User;

    constructor(injector: Injector) {
        super(injector);
        this.user = this.dataProvider.getFromCache(ConnectedUser);
    }

    ngOnInit(): void {

    }

}

