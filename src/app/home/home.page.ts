import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage, FestiAccessPageEnum} from '../extends/festi-access-page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage extends FestiAccessPage implements OnInit {

    constructor(injector: Injector) {
        super(FestiAccessPageEnum.NoAPIUsage, injector);
    }

    ngOnInit() {

    }

}
