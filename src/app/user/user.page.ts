import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {APIResource} from '../implements/apiresource';
import {DataProviderEnum} from '../../providers/data';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/User';
import {ConnectedUser} from '../models/ConnectedUser';

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
                this.showMessage('Erreur: ' + error.message + '\nVeuillez ressayer ou contacter l\'administrateur', 7500);
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
