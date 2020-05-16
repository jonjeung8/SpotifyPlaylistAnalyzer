import { Component, OnInit } from '@angular/core';
import { MetricScores } from '../../_models/metricScores';
import { SpotifyApiServiceService } from '../../_services/spotify-api-service.service';
import { RawMetrics } from '../../_models/RawMetrics';

//imports html and css files
@Component({ 
  selector: 'app-composite-score',
  templateUrl: './composite-score.component.html',
  styleUrls: ['./composite-score.component.css']
})

export class CompositeScoreComponent implements OnInit {
  //declared variables
  metricsDisplay: string; //metric selected in dropdown
  compositeScore: string; //the composite score in string

  constructor() { }

  ngOnInit(): void {
  }

  CalculateCompositeScore(arrayOfMetrics: Array<RawMetrics>, categorySelected: string)
  {
    //store the element selected
    this.metricsDisplay = categorySelected;
    console.log("Hey I made it to calculating composite score");
    // iterate over the array of metrics
    // pull the values of the selected metric into a new array to perform stats
    // we need an average to get started
    // add outliers here later
    let total = 0;
    for (let trackMetric of arrayOfMetrics)
    {
      switch(this.metricsDisplay)
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
    this.compositeScore = parseFloat((total / arrayOfMetrics.length).toFixed(2)).toFixed(2);
    console.log(this.compositeScore);
    // console.log(average);
    // (<HTMLSelectElement>document.getElementById('metricSelected')).value = "0";
    //TODO: add valueable stats to user here (standard deviation, regression analysis)
    //TODO: get fix for CORS policy error
  }
}
