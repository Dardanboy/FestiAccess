import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable()
export class LoadingService {
    private isLoading = false;
    private timeAnimationBegunMs = 0;
    private minimumAnimationTimeMs = 300;

    constructor(public loadingController: LoadingController) {
    }

    async present() {
        this.isLoading = true;
        return await this.loadingController.create({
            duration: 5000,
            message: 'Chargement..'
        }).then(a => {
            a.present().then(() => {
                this.timeAnimationBegunMs = new Date().getTime();
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }

    async dismiss() {
        const timeAnimationShown = new Date().getTime() - this.timeAnimationBegunMs;
        if (timeAnimationShown < this.minimumAnimationTimeMs) {
           await new Promise(resolve => setTimeout(resolve, this.minimumAnimationTimeMs - timeAnimationShown));
        }

        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
}
