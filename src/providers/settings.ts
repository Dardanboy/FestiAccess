import {Injectable} from '@angular/core';
import {Setting} from '../app/models/Setting';
import {DataProvider} from './data';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SettingsService {
    allSettings: Setting;
    behaviour: BehaviorSubject<Setting>;

    constructor(private dataProvider: DataProvider) {
        this.allSettings = new Setting();

        this.dataProvider.getFromMemoryOrStorageCache(Setting)
            .then((setting) => {
                if (setting !== null) {
                    this.allSettings = setting;
                    this.saveSettings(); // We only call it so settings are in memory too (not only in cache)
                } else {
                    console.log('else');
                    this.setDefaultSettingsAndSaveThem();
                }
            })
            .catch((error) => {
                console.log('settings error:');
                this.setDefaultSettingsAndSaveThem();
            });

        this.behaviour = new BehaviorSubject<Setting>(this.allSettings);
    }

    setDefaultSettingsAndSaveThem() {
        this.allSettings.offlineMode = false;
        this.allSettings.apiLink = 'http://localhost:8000/';
        this.saveSettings();
    }

    saveSettings() {
        this.dataProvider.storeDataInStorage(this.allSettings, Setting);
        this.dataProvider.storeDataInMemoryCache(this.allSettings, Setting);
        this.behaviour.next(this.allSettings);
    }

    getSettingBehaviour(): BehaviorSubject<Setting> {
        return this.behaviour;
    }
}
