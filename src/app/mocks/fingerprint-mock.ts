import {FingerprintAIO, FingerprintOptions} from '@ionic-native/fingerprint-aio/ngx';

export interface FingerprintOptions {
    /**
     * Key for platform keychain
     */
    clientId: string;
    /**
     * Secret password. Only for android
     */
    clientSecret?: string;
    /**
     * Disable 'use backup' option. Only for android (optional)
     */
    disableBackup?: boolean;
}

export class FingerprintMock extends FingerprintAIO {

    isAvailable(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    show(options: FingerprintOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve('cmFuZG9tX2hhc2g=');
        });
    }
}
