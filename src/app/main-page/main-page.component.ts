import { Component, OnInit, Input } from '@angular/core';
import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  linkSubmitStr : string;
  bearerTokenStr: string;

  apiResponse: string;

  constructor(private spotifyApi: SpotifyApiServiceService) { 

    this.linkSubmitStr = "";
  }


  ngOnInit(): void {
  }

  AnalysisButtonClicked()
  {

    console.log("Calling to spotify api service");

    this.spotifyApi.GetPlaylistResults(this.linkSubmitStr, this.bearerTokenStr)
    .subscribe(
      response => {
        this.apiResponse = JSON.stringify(response);
        console.log("Api call recieved");
      }
    )

  }

}
