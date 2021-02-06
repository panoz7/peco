import { Component } from '@angular/core';

import { LocationService } from './location.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PECO Reporter';
  constructor() { }

}
