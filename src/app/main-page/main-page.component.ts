import { Component, OnInit, Input } from '@angular/core';
import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';
import { Playlist } from '../_models/Playlist';
import { Track } from '../_models/Track';
import { Album } from '../_models/album';
import { RawMetrics } from '../_models/RawMetrics';


//components
import { CategorySelectorComponent } from '../main-page/category-selector/category-selector.component';
import { CompositeScoreComponent } from '../main-page/composite-score/composite-score.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  linkSubmitStr : string;
  bearerTokenStr: string;

  apiResponse: string;
  // apiResponse2: string;

  userPlaylist: Playlist;

  trackIDArray: string;


  constructor(private spotifyApi: SpotifyApiServiceService) { 

    this.linkSubmitStr = "";
    this.userPlaylist = new Playlist();
    this.userPlaylist.tracks = new Array<Track>();
    this.trackIDArray = "";
    this.userPlaylist.metrics = new Array<RawMetrics>();

  }


  ngOnInit(): void {
  }

// MakeTwoCalls()
// {
//   this.AnalysisButtonClicked();
//   this.GetFeatures();
// }

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
        
          this.userPlaylist.tracks = new Array<Track>();

          for(let item of response.items)
          {
            // Get the album data, get the track data
            let tmpTrack = new Track();
            tmpTrack.href = item.track.href;
            tmpTrack.name = item.track.name;
            tmpTrack.id = item.track.id;
            this.trackIDArray += tmpTrack.id + "%2C";
            console.log(item.track.name);
            console.log(tmpTrack.id);
            if(item.track.album)
            {
              let tmpAlbum = new Album();
              tmpAlbum.href = item.track.album.href;
              tmpAlbum.name = item.track.album.name;
              
              tmpTrack.album = tmpAlbum;
            }
            
            this.userPlaylist.tracks.push(tmpTrack);
            
          }

          //loop through array, grab track IDs
          this.spotifyApi.GetFeatures(this.trackIDArray)
            .subscribe(
              response => {
                this.apiResponse = JSON.stringify(response);
                // console.log("THIS IS WORKING")
                //this.trackID.trackidNum.push(track.id);
                if(response.audio_features)
                {

                this.userPlaylist.metrics = new Array<RawMetrics>();

                  // console.log(response2.items)
                  for(let item of response.audio_features)
                  {
                    let tmpMetrics = new RawMetrics();

                    tmpMetrics.acousticness = item.acousticness;
                    tmpMetrics.danceability = item.danceability;
                    tmpMetrics.duration_ms = item.duration_ms;
                    tmpMetrics.energy = item.energy;
                    tmpMetrics.id = item.id;
                    tmpMetrics.intrumentalness = item.intrumentalness;
                    tmpMetrics.key = item.key;
                    tmpMetrics.liveness = item.liveness;
                    tmpMetrics.loudness = item.loudness;
                    tmpMetrics.mode = item.mode;
                    tmpMetrics.speechiness = item.speechiness;
                    tmpMetrics.tempo = item.tempo;
                    tmpMetrics.time_signature = item.time_signature;
                    tmpMetrics.valence = item.valence;
                
                    console.log(item.key)

                    this.userPlaylist.metrics.push(tmpMetrics);
                  }
                }
              }
            )  
        }

      }  
    )
  }
  // GetFeatures()
  // {
  //   this.spotifyApi.GetFeatures(this.trackIDArray)
  //     .subscribe(
  //       response => {
  //         this.apiResponse = JSON.stringify(response);
  //         console.log("Api call recieved 2");
  //         //console.log(track.id);
  //         //this.trackID.trackidNum.push(track.id);
  //         if(response.items)
  //         {
  //           console.log("THIS IS WORKING")
  //           // console.log(response2.items)
  //           for(let item of response.items)
  //           {
  //             // console.log("THIS IS WORKING")
  //           }
  //         }
  //       }
  //     )  
  // }
}
