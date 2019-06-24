import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {ConnectedUser} from '../models/ConnectedUser';
import {ApiService} from '../../providers/api';
import {SimulateNewApiOffline} from '../../providers/simulateNewApiOffline';
import {HttpRequestCacheManager} from '../models/HttpRequestCacheManager';
import {User} from '../models/User';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends FestiAccessPage implements OnInit {
    isConnected: boolean;

    constructor(injector: Injector) {
        super(injector);
        this.isConnected = false;
        this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser)
            .then((user) => {
                if (user !== null) {
                    this.isConnected = true;
                }
            });
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

    seedNewApi() {
        /**
         * TODO: New api: Must simulate data and add them into the local cache.
         */
        let apiService = new ApiService();
        apiService.API_URL = 'http://localhost:8000/';
        let simulateOfflineData = new SimulateNewApiOffline();

        /**
         * Simulate new data returned after connection
         */
        apiService.API_PATH = '/api/dii/connection';
        // Get old response form http cache
        let httpData = this.dataProvider.getHttpResponseFromCache(apiService.fullUrl(), 'post');
        let newHttpData = httpData;
        // Modify body of newHttpData with what we want (simulation)
        newHttpData.data.body = simulateOfflineData.getConnectionResponse(); // Change the response of old to the new api
        // Read the new response to the cache and save it
        this.dataProvider.httpCacheContainer.addHttpCache(apiService.fullUrl(), 'post', newHttpData.data);
        // console.log('Data from httpCacheContainer Get');
        console.log(this.dataProvider.httpCacheContainer.getHttpCache(apiService.fullUrl(), 'post'));
        this.dataProvider.storeDataInStorage(this.dataProvider.httpCacheContainer.getObject(), HttpRequestCacheManager); // Restore the new data in cache


        /**
         * Simulate the Robert de Niro user: user id: 3
         */
        apiService.API_PATH = '/api/dii/users/3';
        // Get old response form http cache
        httpData = this.dataProvider.getHttpResponseFromCache(apiService.fullUrl(), 'get');
        newHttpData = httpData;
        // Modify body of newHttpData with what we want (simulation)
        newHttpData.data.body = simulateOfflineData.getRobertDeNiroUserResponse(); // Change the response of old to the new api
        // Read the new response to the cache and save it
        this.dataProvider.httpCacheContainer.addHttpCache(apiService.fullUrl(), 'get', newHttpData.data);
        // console.log('Data from httpCacheContainer Get');

        this.dataProvider.storeDataInStorage(this.dataProvider.httpCacheContainer.getObject(), HttpRequestCacheManager); // Restore the new data in cache

        // Let's modify what's in User cache
        this.dataProvider.storeDataInMemoryCache([newHttpData.data.body], User);
        this.dataProvider.storeDataInStorage([newHttpData.data.body], User);


        /**
         * Simulate festivals list here
         * TODO: It's a bit tricky here. We don't have actually a request that goes to /api/dii/festivals. So we copy any requests (for example Robert de Niro), change the link to this and change the value
         */
        // Get old response form http cache
        let httpData2 = this.dataProvider.getHttpResponseFromCache(apiService.fullUrl(), 'get');
        let newHttpData2 = httpData2;
        // Modify body of newHttpData with what we want (simulation)
        newHttpData2.data.body = simulateOfflineData.getFestivalsListResponse(); // Change the response of old to the new api
        apiService.API_PATH = '/api/dii/festivals'; // We use it so we can copy the values of what was returned by this user and modify it manually
        newHttpData2.link = apiService.fullUrl();
        console.log(newHttpData2.link);
        // Read the new response to the cache and save it
        this.dataProvider.httpCacheContainer.addHttpCache(apiService.fullUrl(), 'get', newHttpData2.data);
        this.dataProvider.storeDataInStorage(this.dataProvider.httpCacheContainer.getObject(), HttpRequestCacheManager); // Restore the new data in cache
    }

    ngOnInit() {
    }

}
