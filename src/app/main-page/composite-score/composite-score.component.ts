import { Component, OnInit } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { MetricScores } from '../../_models/metricScores';
import { SpotifyApiServiceService } from '../../_services/spotify-api-service.service';
import { Playlist } from '../../_models/Playlist';
import { Track } from '../../_models/Track';
import { Album } from '../../_models/album';

//imports html and css files
@Component({ 
  selector: 'app-composite-score',
  templateUrl: './composite-score.component.html',
  styleUrls: ['./composite-score.component.css']
})


export class CompositeScoreComponent implements OnInit {

    //declared variables
    metricsDisplay: MetricScores;
    compositeScore: number;
    apiResponse: string;

    linkSubmitStr : string;
    bearerTokenStr: string;
  
    constructor(private spotifyApi: SpotifyApiServiceService) { 

    //initialize variables
    this.linkSubmitStr = "";
    this.metricsDisplay = new MetricScores();
    this.metricsDisplay.numbers = new Array<number>();
    this.compositeScore = 0;
    }

  ngOnInit(): void {
  }

}
