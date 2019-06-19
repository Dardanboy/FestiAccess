import {Injectable, Injector} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {DataProvider} from '../../providers/data';
import {ConnectedUser} from '../models/ConnectedUser';

@Injectable()
export class AuthGuardService implements CanLoad {
    private router: Router;
    private dataProvider: DataProvider;

    constructor(injector: Injector) {
        this.router = injector.get(Router);
        this.dataProvider = injector.get(DataProvider);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canLoad before');

        return this.isUserAlreadyConnected();
    }

    /**
     * It is used to know if the page just accessed can be shown
     * For that, user must be connected and for that we check if there is some data about user in the cache (memory)
     * We don't do the check on pages where the user is not connected yet like home and connection page
     */
    async isUserAlreadyConnected() {
        let actualPage = this.router.url;
        if (actualPage === '/home' || actualPage === '/connection') {
            return true;
        }

        let result = await this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser);

        if (result === null) {
            this.router.navigateByUrl('/');
        }

        return result !== null;
    }
}
