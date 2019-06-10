import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ClassType} from "class-transformer/ClassTransformer";
import {DataProviderEnum} from '../../providers/data';
import {APIResource} from '../implements/apiresource';
import {User} from "../models/User";
import {Router} from "@angular/router";

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.page.html',
    styleUrls: ['./subscription.page.scss'],
})

export class SubscriptionPage extends FestiAccessPage implements OnInit, APIResource {
    private user: FormGroup;

    constructor(injector: Injector, private formBuilder: FormBuilder) {
        super(injector, '/api/dii/subscription');

        this.user = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            fingerPrintHash: [this.generateTempFingerPrintHash('default', 'default'), Validators.required],
        });
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
        console.log(this.user.value);
        this.dataProvider.sendAndWaitResponse(
            DataProviderEnum.POST,
            this.apiResource(this.user.value.name, this.user.value.surname, this.user.value.fingerPrintHash),
            User)
            .then((data) => {
                console.log('data');
                console.log(data);
                if (data.status === 201 && data.body.message === 'CREATED_RESOURCE') {
                    this.showMessage(
                        'Votre compte a bel et bien été créé. Veuillez vous rendre sur la page de connexion pour vous connecter',
                        8000,
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

    apiResource(name: string, surname: string, fingerPrintHash: string): object {
        return {
            name: name,
            surname: surname,
            fingerPrintHash: fingerPrintHash
        };
    }

}
