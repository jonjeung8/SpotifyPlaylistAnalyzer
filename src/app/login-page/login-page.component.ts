import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private spotifyApi: SpotifyApiServiceService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.router.url);
  }


  LoginButtonClicked()
  {
    console.log('Calling to spotify login api service');
    /*this.spotifyApi.LoginRedirect()
    .subscribe(
      response => {
        this.apiResponse = JSON.stringify(response);
        console.log("Api call recieved");
      }
    )*/
    window.location.href = this.spotifyApi.LoginRedirect();

  }
}
