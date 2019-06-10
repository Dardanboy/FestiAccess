import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable()
export class AlertControllerService {

    constructor(public alertCtrl: AlertController) {

    }

    async presentAlert(title: string, message: string, buttons: object = null) {

        const alert = await this.alertCtrl.create({
            header: title,
            message: message,
            buttons: (buttons === null) ? ['Ok'] : buttons,
        });

        return alert.present();
    }
}
