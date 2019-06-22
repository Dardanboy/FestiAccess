import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from "../extends/festi-access-page";
import {ConnectedUser} from "../models/ConnectedUser";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends FestiAccessPage implements OnInit {

    constructor(injector: Injector) {
        super(injector);
    }

    saveSettings() {
        this.message();
        this.settings.saveSettings();
    }

    private message() {
        this.showMessage('Paramètres sauvegardés', 3000);
    }

    wantToResetToDefaultQuestion() {
        this.showAlert('Remettre par défaut',
            'Voulez-vous vraiment mettre les paramètres par défaut ? Tous vos changements seront perdus',
            [
                {
                    text: 'Oui',
                    action: () => {
                        this.settings.setDefaultSettingsAndSaveThem();
                        this.message();
                    }
                },
                {
                    text: 'Non',
                    action: () => {

                    }
                },
            ]);
    }

    disconnect() {
        this.showAlert('Déconnexion',
            'Êtes-vous sûr de vouloir vous déconnecter ?',
            [
                {
                    text: 'Oui',
                    action: () => {
                        this.dataProvider.deleteFromMemoryAndStorageCache(ConnectedUser);
                        this.goTo('/');
                    }
                },
                {
                    text: 'Non',
                    action: () => {

                    }
                },
            ]);
    }

    ngOnInit() {
    }

}
