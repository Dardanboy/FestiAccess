import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {DataProvider} from '../../providers/data';
import { Navigation } from '../implements/navigation';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage extends Navigation {
  private dataProvider: DataProvider;

  constructor(private storage: Storage, private router: Router) {
    super();
    this.dataProvider = new DataProvider(storage);
  }

  goTo(link: string){
    this.router.navigate([link]);
  }
}
