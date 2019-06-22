import {Injectable, Injector} from '@angular/core';
import {Setting} from '../app/models/Setting';
import {DataProvider} from './data';

@Injectable()
export class SettingsService {
    allSettings: Setting;

    constructor(private dataProvider: DataProvider) {
        this.allSettings = new Setting();

        this.dataProvider.getFromMemoryOrStorageCache(Setting)
            .then((setting) => {
                console.log('this.settings:');
                console.log(setting);
                if (setting !== null) {
                    console.log('settings:');
                    this.allSettings = setting;
                } else {
                    console.log('else');
                    this.setDefaultSettingsAndSaveThem();
                }
            })
            .catch((error) => {
                console.log('settings error:');
                this.setDefaultSettingsAndSaveThem();
            });
    }

    setDefaultSettingsAndSaveThem() {
        this.allSettings.offlineMode = false;
        this.allSettings.apiLink = 'http://localhost:8000/';
        this.saveSettings();
    }

    saveSettings() {
        this.dataProvider.storeDataInStorage(this.allSettings, Setting);
    }
}
