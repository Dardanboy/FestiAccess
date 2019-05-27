import { Component, OnInit } from '@angular/core';
import { Navigation } from '../implements/navigation'
import {Router} from "@angular/router";


@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage extends Navigation {

  constructor(router: Router) {
    super(router);
  }
}
