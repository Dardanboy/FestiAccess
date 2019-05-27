import { Component, OnInit } from '@angular/core';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {

  constructor() {

      // faio.isAvailable().then( (result) => {
      //     alert("Fingerprint available");
      //
      // }).catch((onmessage) => {
      //     alert(onmessage);
      // });
  }

  ngOnInit() {
  }

}
