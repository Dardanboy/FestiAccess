import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataProviderEnum} from '../../providers/data';
import {APIResource} from '../implements/apiresource';
import {User} from '../models/User';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.page.html',
    styleUrls: ['./subscription.page.scss'],
})

export class SubscriptionPage extends FestiAccessPage implements OnInit, APIResource {
    private user: FormGroup;

    constructor(injector: Injector, private formBuilder: FormBuilder) {
        super(injector, '/api/dii/subscription');
        console.log(this.dataProvider);

        this.initializeUserFormBuilder();
    }

    ngOnInit() {

    }

    /**
     * This method is used because the native fingerprint has not been implemented.
     * So this will create a fake hash based on name + surname + random numbers
     */
    private generateTempFingerPrintHash(name, surname) {
        return btoa(name + surname + Math.floor((Math.random() * 1024) + 1).toString());
    }

    subscribe() {
        this.user.value.fingerPrintHash = this.generateTempFingerPrintHash(this.user.value.name, this.user.value.surname);

        this.dataProvider.sendAndWaitResponse(
            this.apiService,
            DataProviderEnum.POST,
            this.apiResource(this.user.value.name, this.user.value.surname, this.user.value.fingerPrintHash),
            User
        )
            .then((data) => {
                console.log('data');
                console.log(data);
                if (data.status === 201 && data.body.message === 'CREATED_RESOURCE') {
                    this.resetInputValues();

                    this.showAlert('Compte créé',
                        'Votre compte a bel et bien été créé. Veuillez vous rendre sur la page de connexion pour vous connecter',
                        [{
                            text: 'Se connecter',
                            action: () => {
                                this.goTo('connection');
                            }
                        }]);
                }
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.showMessage('Erreur: ' + error.message);
            });
    }

    private resetInputValues() {
        this.user.reset();
        this.initializeUserFormBuilder();
    }

    private initializeUserFormBuilder() {
        this.user = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            fingerPrintHash: [this.generateTempFingerPrintHash('default', 'default'), Validators.required],
        });
    }

    apiResource(name: string, surname: string, fingerPrintHash: string): object {
        return {
            name: name,
            surname: surname,
            fingerPrintHash: fingerPrintHash
        };
    }
}
