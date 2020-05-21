import { Component } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string;

  constructor() {
    this.title = 'SpotifyPlaylistAnalyzer';
  }
}
