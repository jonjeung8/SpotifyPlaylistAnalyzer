import { Component, OnInit } from '@angular/core';
import { Track } from '../_models/Track';
import { Playlist } from '../_models/Playlist';
import { RawMetrics } from '../_models/RawMetrics';

const VARIANCE: number = .05;

@Component({
  selector: 'app-outliers',
  templateUrl: './outliers.component.html',
  styleUrls: ['./outliers.component.css']
})
export class OutliersComponent implements OnInit {

  outlierTracks: Array<Track>;

  constructor() { }

  ngOnInit(): void {
  }

  getOutliers(playlist: Playlist, avg: number, metric: string) {

    this.outlierTracks = new Array<Track>();

    // Special cases where we did some extra math to bend the average before hand:
    if(metric === "instrumentalness")
    {
      avg = this.recalculateAverage(playlist.metrics, metric);
    }
    else if(metric === "liveness")
    {
      avg = this.recalculateAverage(playlist.metrics, metric);
      console.log("Recalculating for liveness. New Avg: " + avg);
    }


    for(let m of playlist.metrics) {
      var value: number = m.getMetric(metric);
      var newAvg: number = null;
      /*
        avg = 0.49
        playlist len = 16
        value  = .614 (Young americans danceability)

        newAvg = (0.49 * 16) - 0.614 / (15) = 0.4817

        n = 1 - (0.4817 / 0.49)

      */
      //newAvg = ((avg * playlist.metrics.length) - value) / (playlist.metrics.length -1);
      //let n: number = 1 - avg/newAvg;
      let n: number = 1 - value / avg;
      if(n >= VARIANCE) {

        this.outlierTracks.push(this.matchID(playlist, m.id));
      }
    }
    console.log("Total outliers: " + this.outlierTracks.length);
  }

  matchID(playlist: Playlist, id: string): Track {
    var toReturn: Track = null;
    for(let track of playlist.tracks) {
      if(track.id === id) {
        toReturn = track;
        break;
      }
    }
    return toReturn;
  }

  private recalculateAverage(rawMetrics: Array<RawMetrics>, metricSelected: string) : number
  {
    var total: number = 0;
    for(let metric of rawMetrics)
    {
      total += metric.getMetric(metricSelected);
    }
    total /= rawMetrics.length;
    return total;
  }

}
