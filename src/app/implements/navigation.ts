import {Router} from "@angular/router";

export class Navigation {

    constructor(protected router: Router) {}

    goTo(link: string){
        this.router.navigate([link]);
    }
}
