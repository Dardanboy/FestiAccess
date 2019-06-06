import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})

export class MainPage extends FestiAccessPage implements OnInit {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {

    }
}

