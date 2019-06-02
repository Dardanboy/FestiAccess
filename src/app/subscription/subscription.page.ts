import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.page.html',
    styleUrls: ['./subscription.page.scss'],
})

export class SubscriptionPage  extends FestiAccessPage implements OnInit  {

    constructor(injector: Injector){
        super('/subscription', injector);
    }

    ngOnInit() {

    }

    goTo(link: string): void {

    }

    subscribe() {

    }

}
