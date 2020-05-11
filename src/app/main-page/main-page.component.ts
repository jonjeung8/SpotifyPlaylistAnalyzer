import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';
import { Playlist } from '../_models/Playlist';
import { Track } from '../_models/Track';
import { Album } from '../_models/album';
import { Category } from '../_models/category';
//components
import { CategorySelectorComponent } from '../main-page/category-selector/category-selector.component';
import { from } from 'rxjs';

export const CATEGORIES: Array<Category> = Array(
  // Categories for when we switch over later on:
/*  new Category("Party", "Party"), 
  new Category("Focus", "Focus"),
  new Category("Relax", "Relax")*/
  new Category("Duration", "duration_ms"),
  new Category("Time Signature", "time_signature"),
  new Category("Danceability", "danceability"),
  new Category("Energy", "energy"),
  new Category("Key", "key"),
  new Category("Loudness","loudness"),
  new Category("Mode", "mode"),
  new Category("Speechiness", "speechiness"),
  new Category("Acousticness", "acousticness"),
  new Category("Instrumentalness", "instrumentalness"),
  new Category("Liveness", "liveness"),
  new Category("Valence", "valence"),
  new Category("Tempo", "tempo")
  );

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  linkSubmitStr: string;
  bearerTokenStr: string;

  apiResponse: string;

  userPlaylist: Playlist;
  categories: Array<Category> = CATEGORIES;

  @ViewChild("appCategorySelector") appCategorySelector: CategorySelectorComponent;

  constructor(private spotifyApi: SpotifyApiServiceService) { 

    this.linkSubmitStr = "";
    this.userPlaylist = new Playlist();
    this.userPlaylist.tracks = new Array<Track>();
  }


  ngOnInit(): void {
  }

  AnalysisButtonClicked()
  {

    console.log("Calling to spotify api service");
    //TODO display error if category validation fails
    console.log(this.appCategorySelector.validateCategory());
    console.log(this.appCategorySelector.category);

    this.spotifyApi.GetPlaylistResults(this.linkSubmitStr, this.bearerTokenStr)
    .subscribe(
      response => {
        this.apiResponse = JSON.stringify(response);
        console.log("Api call recieved");

        if(response.items)
        {
        
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
        }

      }
    )

  }

}
