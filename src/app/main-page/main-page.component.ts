import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';
import { Playlist } from '../_models/Playlist';
import { Track } from '../_models/Track';
import { Album } from '../_models/album';
import { RawMetrics } from '../_models/RawMetrics';
import { Category } from '../_models/category';


//components
import { CategorySelectorComponent } from '../main-page/category-selector/category-selector.component';
import { CompositeScoreComponent } from '../main-page/composite-score/composite-score.component';


export const CATEGORIES: Array<Category> = Array(
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
  new Category("Tempo", "tempo"),
  new Category("Time Signature", "time_signature"),
  new Category("Duration", "duration_ms")
);

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  linkSubmitStr: string; //link of the playlist
  bearerTokenStr: string; //bearertoken
  widgetSubmitStr: string; //link created for the widget
  trackIDArray: string; //stringified array of track ids in playlist
  hidden: boolean; // determines when to reveal the response
  userPlaylist: Playlist; // to store the playlist
  categories: Array<Category> = CATEGORIES;
  metricSelected: string; //metric selected in dropdown
  average: string; //the composite score in string

  @ViewChild("appCategorySelector") appCategorySelector: CategorySelectorComponent;

  constructor(private spotifyApi: SpotifyApiServiceService) { 
    this.linkSubmitStr = "";
    this.widgetSubmitStr = "";
    this.trackIDArray = "";
    this.userPlaylist = new Playlist();
    this.userPlaylist.tracks = new Array<Track>();
    this.hidden = true;
    this.userPlaylist.metrics = new Array<RawMetrics>();
  }
  
  ngOnInit(): void {
  }

  ShowPlaylistElements()
  {
    this.hidden = false;
  }

  CalculateCompositeScore(arrayOfMetrics: Array<RawMetrics>)
  {
    //store the element selected
    this.metricSelected = (<HTMLSelectElement>document.getElementById('metricSelected')).value;
    console.log("Hey I made it to calculating composite score");
    // iterate over the array of metrics
    // pull the values of the selected metric into a new array to perform stats
    // we need an average to get started
    // add outliers here later
    let total = 0;
    for (let trackMetric of arrayOfMetrics)
    {
      switch(this.metricSelected)
      {
        case "danceability":
          {
            total += trackMetric.danceability;
            break;
          }
        case "energy":
          {
            total += trackMetric.energy;
            break;
          }
        case "key":
          {
            total += trackMetric.key;
            break;
          }
        case "loudness":
          {
            total += trackMetric.loudness;
            break;
          }
        case "mode":
          {
            total += trackMetric.mode;
            break;
          }
        case "speechiness":
          {
            total += trackMetric.speechiness;
            break;
          }
        case "acousticness":
          {
            total += trackMetric.acousticness;
            break;
          }
        case "instrumentalness":
          {
            total += trackMetric.instrumentalness;
            break;
          }
        case "liveness":
          {
            total += trackMetric.liveness;
            break;
          }
        case "valence":
          {
            total += trackMetric.valence;
            break;
          }
        case "tempo":
          {
            total += trackMetric.tempo;
            break;
          }
        case "time_signature":
          {
            total += trackMetric.time_signature;
            break;
          }
        case "duration_ms":
          {
            total += trackMetric.duration_ms;
            break;
          }
        default:
          {
            console.log("hello, I've experienced an error somehow, or the user didn't select a category");
          } 
      }
    }
    console.log(total);
    console.log(arrayOfMetrics.length);
    this.average = parseFloat((total / arrayOfMetrics.length).toFixed(2)).toFixed(2);
    console.log(this.average);
    // console.log(average);
    // (<HTMLSelectElement>document.getElementById('metricSelected')).value = "0";
    //TODO: add valueable stats to user here (standard deviation, regression analysis)
    //TODO: get fix for CORS policy error
  }
  
  AnalysisButtonClicked()
  {
    this.widgetSubmitStr = `https://open.spotify.com/embed/playlist/${this.linkSubmitStr}`;
    
    console.log("Calling to spotify api service");
    
    this.spotifyApi.GetPlaylistResults(this.linkSubmitStr, this.bearerTokenStr)
    .subscribe({
      next: (response: any) => {
        console.log("I MADE IT TO the get playlist api response");
        console.log("Api call recieved for first");

        if (response.items)
        {
          for(let item of response.items)
          {
            // Get the album data, get the track data
            let tmpTrack = new Track();
            tmpTrack.href = item.track.href;
            tmpTrack.name = item.track.name;
            tmpTrack.id = item.track.id;
            this.trackIDArray += tmpTrack.id + "%2C";
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
      },
      complete: () =>
      {
        this.spotifyApi.GetFeatures(this.trackIDArray)
        .subscribe({
          next: (response: any) => {
            console.log("I MADE IT TO the get features response");
            console.log("Api call recieved for second");

            if (response.audio_features)
            {
              console.log(response.audio_features);
              for(let item of response.audio_features)
              {
                let tmpMetrics = new RawMetrics();
                tmpMetrics.acousticness = item.acousticness;
                tmpMetrics.danceability = item.danceability;
                tmpMetrics.duration_ms = item.duration_ms;
                tmpMetrics.energy = item.energy;
                tmpMetrics.id = item.id;
                tmpMetrics.instrumentalness = item.intrumentalness;
                tmpMetrics.key = item.key;
                tmpMetrics.liveness = item.liveness;
                tmpMetrics.loudness = item.loudness;
                tmpMetrics.mode = item.mode;
                tmpMetrics.speechiness = item.speechiness;
                tmpMetrics.tempo = item.tempo;
                tmpMetrics.time_signature = item.time_signature;
                tmpMetrics.valence = item.valence;
                this.userPlaylist.metrics.push(tmpMetrics);
              }
            }
            // this.JoinMetricToTracks(tmpMetrics, this.userPlaylist.metrics);
          },
          complete: () => 
          {
            this.CalculateCompositeScore(this.userPlaylist.metrics); 
            this.ShowPlaylistElements();
          }
        })
      }
    })
  }
}
