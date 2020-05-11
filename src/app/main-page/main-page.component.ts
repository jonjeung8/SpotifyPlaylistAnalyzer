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

  linkSubmitStr: string;
  bearerTokenStr: string;
  widgetSubmitStr: string;
  apiResponse: string;
  hidden: boolean;
  // apiResponse2: string;

  userPlaylist: Playlist;
  categories: Array<Category> = CATEGORIES;

  @ViewChild("appCategorySelector") appCategorySelector: CategorySelectorComponent;

  trackIDArray: string;


  constructor(private spotifyApi: SpotifyApiServiceService) { 

    this.linkSubmitStr = "";
    this.widgetSubmitStr = "";
    this.userPlaylist = new Playlist();
    this.userPlaylist.tracks = new Array<Track>();
    this.hidden = true;
    this.trackIDArray = "";
    this.userPlaylist.metrics = new Array<RawMetrics>();
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

  JoinMetricsToTracks(arrayOfTracks: Array<Track>, arrayOfMetrics: Array<RawMetrics>)
  {
    for (let metric of arrayOfMetrics)
    {
      for (let track of arrayOfTracks)
      {
        if (metric.id == track.id)
        {
          track.metrics = metric;
          // console.log(track.metrics.key)
          // console.log(track.id)
        }
      }
    }
  }

  CalculateCompositeScore(arrayOfMetrics: Array<RawMetrics>)
  {
    let value = (<HTMLSelectElement>document.getElementById('metricSelected')).value;
    console.log("Hey I made it to this statement");
    console.log(value);
    // iterate over the array of metrics
    // pull the values of the selected metric into a new array to perform stats
    // we need an average to get started
    // add outliers here later
    var arrayLen = arrayOfMetrics.length;
    console.log(arrayLen);
    var average = 0;
    for (let trackMetric of arrayOfMetrics)
    {
      switch(value)
      {
        case "danceability":
          {
            average += trackMetric.danceability;
            break;
          }
        case "energy":
          {
            average += trackMetric.energy;
            break;
          }
        case "key":
          {
            average += trackMetric.key;
            break;
          }
        case "loudness":
          {
            average += trackMetric.loudness;
            break;
          }
        case "mode":
          {
            average += trackMetric.mode;
            break;
          }
        case "speechiness":
          {
            average += trackMetric.speechiness;
            break;
          }
        case "acousticness":
          {
            average += trackMetric.acousticness;
            break;
          }
        case "instrumentalness":
          {
            average += trackMetric.instrumentalness;
            break;
          }
        case "liveness":
          {
            average += trackMetric.liveness;
            break;
          }
        case "valence":
          {
            average += trackMetric.valence;
            break;
          }
        case "tempo":
          {
            average += trackMetric.tempo;
            break;
          }
        case "time_signature":
          {
            average += trackMetric.time_signature;
            break;
          }
        case "duration_ms":
          {
            average += trackMetric.duration_ms;
            break;
          }
        default:
        {
          console.log("hello, I've experienced an error somehow, this is a default message inside a massive switch statement");
        } 
      }
      console.log(average);
    }
    average = average / arrayLen;
    console.log(average);
    // (<HTMLSelectElement>document.getElementById('metricSelected')).value = "0";
    //TODO: add valueable stats to user here (standard deviation, regression analysis)
    //TODO: get fix for CORS policy error
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
            tmpTrack.id = item.track.id;
            this.trackIDArray += tmpTrack.id + "%2C";
            // console.log(item.track.name);
            // console.log(tmpTrack.id);
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
                    tmpMetrics.instrumentalness = item.intrumentalness;
                    tmpMetrics.key = item.key;
                    tmpMetrics.liveness = item.liveness;
                    tmpMetrics.loudness = item.loudness;
                    tmpMetrics.mode = item.mode;
                    tmpMetrics.speechiness = item.speechiness;
                    tmpMetrics.tempo = item.tempo;
                    tmpMetrics.time_signature = item.time_signature;
                    tmpMetrics.valence = item.valence;
                
                    console.log(item.tempo);
                    console.log(item.id);

                    this.userPlaylist.metrics.push(tmpMetrics);
                  }
                  this.JoinMetricsToTracks(this.userPlaylist.tracks, this.userPlaylist.metrics);
                  this.CalculateCompositeScore(this.userPlaylist.metrics);
                }
              }
            )  
        }
        this.ShowPlaylistElements();
      }  
    )
  }
}
