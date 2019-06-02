import { Component, OnInit } from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {DataProvider} from '../../providers/data';
import { Navigation } from '../implements/navigation';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage extends FestiAccessPage implements OnInit, Navigation  {
  private data: DataProvider;

  constructor(dataProvider: DataProvider) {
    super('/subscription');
    this.data = dataProvider;
  }

  ngOnInit() {

  }

  goTo(link: string): void {

  }

  subscribe() {

  }

}
