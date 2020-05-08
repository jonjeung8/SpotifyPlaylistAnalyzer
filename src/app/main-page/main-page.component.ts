import { Component, OnInit, Input } from '@angular/core';
import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';
import { Playlist } from '../_models/Playlist';
import { Track } from '../_models/Track';
import { Album } from '../_models/album';
//components
import { CategorySelectorComponent } from '../main-page/category-selector/category-selector.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  linkSubmitStr: string;
  bearerTokenStr: string;
  widgetSubmitStr: string;
  apiResponse: string;
  hidden: boolean;

  userPlaylist: Playlist;

  constructor(private spotifyApi: SpotifyApiServiceService) { 

    this.linkSubmitStr = "";
    this.widgetSubmitStr = "";
    this.userPlaylist = new Playlist();
    this.userPlaylist.tracks = new Array<Track>();
    this.hidden = true;
  }
  

  ngOnInit(): void {
  }

  FunctionsOnClick()
  {
    this.AnalysisButtonClicked();
  }

  ShowPlaylistElements()
  {
    this.hidden = false;
  }

  AnalysisButtonClicked()
  {

    console.log("Calling to spotify api service");

    this.spotifyApi.GetPlaylistResults(this.linkSubmitStr, this.bearerTokenStr)
    .subscribe(
      response => {
        this.apiResponse = JSON.stringify(response);
        console.log("Api call recieved");

        if(response.items)
        {
          this.widgetSubmitStr = "https://open.spotify.com/embed/playlist/" + this.linkSubmitStr;
          this.userPlaylist.tracks = new Array<Track>();

          for(let item of response.items)
          {
            // Get the album data, get the track data
            let tmpTrack = new Track();
            tmpTrack.href = item.track.href;
            tmpTrack.name = item.track.name;
            console.log(item.track.name);
            if(item.track.album)
            {
              let tmpAlbum = new Album();
              tmpAlbum.href = item.track.album.href;
              tmpAlbum.name = item.track.album.name;

              tmpTrack.album = tmpAlbum;
            }
            
            this.userPlaylist.tracks.push(tmpTrack);
            
          }
          this.ShowPlaylistElements();
        }
      }
    );
  }
}
