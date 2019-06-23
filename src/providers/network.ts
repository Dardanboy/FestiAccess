import {Network} from '@ionic-native/network/ngx';
import {Injectable} from '@angular/core';

@Injectable()
export class NetworkService {
    private _isConnected;

    constructor(private _network: Network) {
        this._isConnected = false;
        this._isConnected = this._network.onDisconnect().subscribe(() => {
            console.log('disconnected');
            this._isConnected = false;
        });

        this._network.onConnect().subscribe(() => {
            console.log('disconnected');
            this._isConnected = true;
        });
    }

    get network(): Network {
        return this._network;
    }

    get isConnected() {
        return this._isConnected;
    }
}
