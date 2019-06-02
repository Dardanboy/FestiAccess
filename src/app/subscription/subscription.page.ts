import { Component, OnInit } from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {DataProvider} from '../../providers/data';
import { Navigation } from '../implements/navigation';
import {Router} from "@angular/router";

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.page.html',
    styleUrls: ['./subscription.page.scss'],
})

export class SubscriptionPage   implements OnInit, Navigation  {

    constructor(router: Router, dataProvider: DataProvider){
        // super('/subscription', router, dataProvider);
    }

    ngOnInit() {

    }

    goTo(link: string): void {

    }

    subscribe() {

    }

}
