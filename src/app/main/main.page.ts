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

        let userCache = this.dataProvider.getFromCache(User);
        if (userCache === undefined || userCache === null) {
            this.backHome();
        }

        this.user = userCache[0];
        if (this.user === undefined || this.user === null) {
            this.backHome();
        }
    }

    ngOnInit(): void {
        this.user = new User();
    }
}

