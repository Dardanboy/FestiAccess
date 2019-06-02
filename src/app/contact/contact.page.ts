import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.scss'],
})
export class ContactPage extends FestiAccessPage implements OnInit {

    constructor(injector: Injector) {
        super(null, injector)
    }

    ngOnInit(): void {

    }

    goTo(link: string): void {

    }



}
