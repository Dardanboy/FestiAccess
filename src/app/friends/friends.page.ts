import {Component, Injector, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {formatDate} from '@angular/common';
import {FestiAccessPage} from '../extends/festi-access-page';
import {ConnectedUser} from '../models/ConnectedUser';
import {User} from '../models/User';

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
        this.user = null;
        this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser)
            .then((data) => {
                this.user = data;
                this.classifyFriendsFromHereToNot();
            })
            .catch((error) => {
                this.showMessage('[Friends:26] Erreur: ' + error);
            });
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
            } else {
                return -1;
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
        let actualUserId = -1;
        this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser).then((user) => {
            console.log('user');
            console.log(user);
            actualUserId = user.id;

            this.apiService.API_PATH = '/api/dii/users/' + actualUserId + '/friends/' + friendId;
            this.dataProvider.httpDeleteRequest(this.apiService)
                .then((data) => {
                    if (data.body.message === 'RESOURCE_DELETED') {
                        this.showMessage('Le contact a bien été supprimé', 4000);
                    }
                })
                .catch((error: any) => {
                    let message = null;
                    if (error !== null && error.message !== null && error.message !== undefined) {
                        message = error.message;
                    } else {
                        message = error;
                    }
                    this.showMessage('[Friends:85] Erreur: ' + error + '\nVeuillez ressayer ou contacter l\'administrateur', 2500);
                })
                .finally(() => {
                    this.reloadUserWithFriends();
                });
        });
    }

    reloadUserWithFriends() {
        this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser).then((user) => {
            let actualUser = user.id;
            this.apiService.API_PATH = '/api/dii/users/' + actualUser;

            this.startLoading();

            this.dataProvider.httpGetRequest(this.apiService, ConnectedUser)
                .then((data) => {
                    console.log('ConnectedUser2: ');
                    console.log(ConnectedUser);
                    this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser).then((connectedUser) => {
                        this.user = connectedUser;
                        this.classifyFriendsFromHereToNot();
                    });
                })
                .catch((error: any) => {
                    let message = null;
                    if (error !== null && error.message !== null && error.message !== undefined) {
                        message = error.message;
                    } else {
                        message = error;
                    }

                    this.showMessage('[Friends:110] Erreur: ' + error + '\nVeuillez ressayer ou contacter l\'administrateur', 2500);
                })
                .finally(() => {
                    this.stopLoading();
                });
        });
    }

    showContactInfo(id: number) {
        this.goTo('user', id);
    }

    ngOnInit() {

    }
}
