import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FestiAccessPage} from '../extends/festi-access-page';
import {DataProvider} from '../../providers/data';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})

export class ConnectionPage extends FestiAccessPage implements OnInit {
  private data: DataProvider;

  constructor(router: Router, dataProvider: DataProvider) {
    super('/connection');
    this.data = dataProvider;
  }

  ngOnInit() {

  }

  goTo(link: string): void {

  }

  connect() {

  }
}
