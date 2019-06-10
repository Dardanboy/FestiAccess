import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable()
export class ToastService {

    constructor(public toastController: ToastController) {
    }

    async presentToast(message: string, duration: number, buttons: object = []) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            buttons: buttons
        });
        return toast.present();
    }
}
