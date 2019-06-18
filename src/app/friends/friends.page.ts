import {Component, Injector, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {formatDate} from '@angular/common';
import {FestiAccessPage} from '../extends/festi-access-page';
import {ConnectedUser} from '../models/ConnectedUser';
import {User} from '../models/User';
import {DataProviderEnum} from "../../providers/data";

@Component({
    selector: 'app-friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.scss'],
})
export class FriendsPage extends FestiAccessPage implements OnInit {
    user: User;
    today: number = Date.now();

    constructor(injector: Injector) {
        super(injector);
        this.user = this.dataProvider.getFromMemoryCache(ConnectedUser);
        this.classifyFriendsFromHereToNot();
    }

    doRefresh(event) {
        console.log('Begin async operation');

        this.reloadUserWithFriends();
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    classifyFriendsFromHereToNot() {
        let friends = this.user.friends;
        const result = friends.sort((a, b) => {
            if (!a.ishere && b.ishere) {
                return 1;
            }
        });
    }

    deleteContact(friendId: number) {
        this.showAlert('Suppression de contact',
            'Êtes-vous sûr de vouloir supprimer le contact ? ' +
            'Vous n\'aurez plus accès aux informations de présence du contact et vous disparaîtrez également de sa liste de contacts',
            [
                {
                    text: 'Supprimer',
                    action: () => {
                        this.sendRequestToDeleteFriendship(friendId);
                    }
                },
                {
                    text: 'Annuler',
                    action: () => {

                    }
                }
            ]);
    }

    private sendRequestToDeleteFriendship(friendId: number) {
        this.apiService.API_PATH = '/api/dii/users/' + this.dataProvider.getFromMemoryCache(ConnectedUser).id + '/friends/' + friendId;

        this.dataProvider.httpDeleteRequest(this.apiService)
            .then((data) => {
                if (data.body.message === 'RESOURCE_DELETED') {
                    this.showMessage('Le contact a bien été supprimé', 4000);
                }
            })
            .catch((error: any) => {
                this.showMessage('Erreur: ' + error.message + '\nVeuillez ressayer ou contacter l\'administrateur', 7500);
            })
            .finally(() => {
                this.reloadUserWithFriends();
            });
    }

    reloadUserWithFriends() {
        this.apiService.API_PATH = '/api/dii/users/' + this.dataProvider.getFromMemoryCache(ConnectedUser).id;
        this.startLoading();

        this.dataProvider.httpGetRequest(this.apiService, ConnectedUser)
            .then((data) => {
                console.log('ConnectedUser2: ');
                console.log(ConnectedUser);
                this.user = this.dataProvider.getFromMemoryCache(ConnectedUser);
                this.classifyFriendsFromHereToNot();
            })
            .catch((error: any) => {
                this.showMessage('Erreur: ' + error.message + '\nVeuillez ressayer ou contacter l\'administrateur', 7500);
            })
            .finally(() => {
                this.stopLoading();
            });
    }

    showContactInfo(id: number) {
        this.goTo('user', id);
    }

    ngOnInit() {

    }


}
