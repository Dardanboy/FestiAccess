import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
    private isLoading = false;

    constructor(public loadingController: LoadingController) { }

    async present() {
        this.isLoading = true;
        return await this.loadingController.create({
            duration: 5000,
            message: 'Chargement..'
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }

    async dismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
}
