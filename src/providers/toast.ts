import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable()
export class ToastService {

    constructor(public toastController: ToastController) {
    }

    async presentToast(message: string, duration: number) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration
        });
        return toast.present();
    }
}
