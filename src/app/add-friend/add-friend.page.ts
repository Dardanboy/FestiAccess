import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from "../extends/festi-access-page";
import {ConnectedUser} from "../models/ConnectedUser";

@Component({
    selector: 'app-add-friend',
    templateUrl: './add-friend.page.html',
    styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage extends FestiAccessPage implements OnInit {
    private instructionMessageShown: boolean;
    private user: User;
    constructor(injector: Injector) {
        super(injector);
        this.user = this.dataProvider.getFromCache(ConnectedUser);
        this.instructionMessageShown = false;
    }

    instructionMessageUnderstood() {
        this.instructionMessageShown = true;
    }

    ngOnInit() {

    }

}
