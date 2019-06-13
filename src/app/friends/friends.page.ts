import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {User} from '../models/User';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.scss'],
})
export class FriendsPage extends FestiAccessPage implements OnInit {
    private user: User;

    constructor(injector: Injector) {
        super(injector);
        console.log('friends constructor');
        console.log(this.dataProvider);
    }

    ngOnInit() {
        this.user = this.dataProvider.getFromCache(User);
    }


}
