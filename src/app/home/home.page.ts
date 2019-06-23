import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {ConnectedUser} from '../models/ConnectedUser';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage extends FestiAccessPage implements OnInit {
    constructor(injector: Injector) {
        super(injector);
        console.log('entered home');
        this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser)
            .then((data) => {
                if (data !== null) {
                    console.log('data:');
                    console.log(data);
                    console.log('home going to tabs');
                    this.goTo('tabs');
                }
            })
            .catch((error) => {
                console.log('catch homepage');
            });
    }

    ngOnInit() {

    }

}
