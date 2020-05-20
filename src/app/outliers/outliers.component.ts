import { Component, OnInit } from '@angular/core';
import { Track } from '../_models/Track';
import { Playlist } from '../_models/Playlist';

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
    for(let m of playlist.metrics) {
      var value: number = m.getMetric(metric);
      var newAvg: number = null;
      newAvg = ((avg * playlist.metrics.length) - value) / (playlist.metrics.length -1);
      let n: number = 1 - newAvg/avg;
      if(n >= VARIANCE) {
        this.outlierTracks.push(this.matchID(playlist, m.id));
      }
    }
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


}
