import { Component, ViewChild } from '@angular/core';
import { BackGroundComponent } from './back-ground/back-ground.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('background', { static: true })
  background!: BackGroundComponent;
  title = 'mTest';
  getAllData() {
    debugger;
    this.background.getAllData();
  }
}
