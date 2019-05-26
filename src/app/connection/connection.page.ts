import { Component, OnInit } from '@angular/core';
import { FingerprintAIOOriginal, FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {

  constructor(private faio: FingerprintAIOOriginal) {
    this.faio.show({
      clientId: 'Fingerprint-Demo', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
      clientSecret: 'o7aoOMYUbyxaD23oFAnJ', //Necessary for Android encrpytion of keys. Use random secret key.
      disableBackup:true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
        .then((result: any) => console.log(result))
        .catch((error: any) => console.log(error));
  }

  ngOnInit() {
  }

}
