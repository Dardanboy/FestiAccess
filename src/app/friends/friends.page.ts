import {Component, Injector, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {formatDate} from '@angular/common';
import {FestiAccessPage} from '../extends/festi-access-page';
import {User} from '../models/User';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.scss'],
})
export class FriendsPage extends FestiAccessPage implements OnInit {
    private user: User;
    today: number = Date.now();

    constructor(injector: Injector) {
        super(injector);
        this.user = this.dataProvider.getFromCache(User);
        this.classifyFriendsFromHereToNot();
    }

    classifyFriendsFromHereToNot() {
        let friends = this.user.friends;
        const result = friends.sort((a, b) => {
            if (!a.ishere && b.ishere) {
                return 1;
            }
        });
    }

    deleteContact(id: number) {
        console.log('showContactInfo');
    }

    showContactInfo(id: number) {
        console.log('showContactInfo');
    }

    ngOnInit() {

    }


}
