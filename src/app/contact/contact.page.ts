import { Component, OnInit } from '@angular/core';
import {Navigation} from '../implements/navigation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit, Navigation {

  constructor() { }

  ngOnInit() {
  }

  goTo(link: string): void {

  }



}
