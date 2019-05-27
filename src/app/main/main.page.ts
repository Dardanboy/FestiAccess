import { Component, OnInit } from '@angular/core';
import {DataProvider} from '../../providers/data';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  private role: string;
  public data: DataProvider;
  
  constructor(private data: DataProvider) {
    this.data = new DataProvider(data);
  }

  ngOnInit() {
  }

}
