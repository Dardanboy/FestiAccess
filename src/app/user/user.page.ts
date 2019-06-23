import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/User';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage extends FestiAccessPage implements OnInit {
    user: User;

    constructor(injector: Injector, private route: ActivatedRoute) {
        super(injector);

        this.startLoading();

        this.apiService.API_PATH = '/api/dii/users/' + this.route.snapshot.paramMap.get('id');

        this.dataProvider.httpGetRequest(this.apiService, User)
            .then((data) => {
                this.user = null;

                this.dataProvider.getFromMemoryOrStorageCache(User).then((user) => {
                    this.user = user;
                });
            })
            .catch((error: any) => {
                let message = null;
                if (error !== null && error.message !== undefined && error.message !== null) {
                    message = error.message;
                } else {
                    message = error;
                }
                this.showMessage('[User] Erreur: ' + message + '\nVeuillez ressayer ou contacter l\'administrateur', 2500);
            })
            .finally(() => {
                this.stopLoading();
            });
    }

    ngOnInit() {
    }

    apiResource(idNumber: string): object {
        return {
            id: idNumber
        };
    }

}
