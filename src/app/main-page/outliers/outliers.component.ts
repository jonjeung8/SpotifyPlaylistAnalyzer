import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Track } from '../../_models/Track';
import { Playlist } from '../../_models/Playlist';
import { RawMetrics } from '../../_models/RawMetrics';

const VARIANCE = .05;

@Component({
  selector: 'app-outliers',
  templateUrl: './outliers.component.html',
  styleUrls: ['./outliers.component.css']
})
export class OutliersComponent implements OnInit {

  outlierTracks: Array<Track>;

  @Output() MetricsRequested = new EventEmitter<boolean>();

  showMetrics() {
    this.MetricsRequested.emit(true);
  }

  constructor() { }

  ngOnInit(): void {
  }

  getOutliers(playlist: Playlist, avg: number, metric: string) {

    this.outlierTracks = new Array<Track>();

    // There must be at least 2 songs to have outliers:
    if (playlist.metrics.length < 2)
    {
      return;
    }

     // 1. Sort the array based on the metric being calculated
    const sortMetrics: RawMetrics[] = playlist.metrics.sort(
      (a, b) => a.getMetric(metric) < b.getMetric(metric) ? -1 : a.getMetric(metric) > b.getMetric(metric) ? 1 : 0);

    // 2. Find the median in the (now sorted) array
      // If even number of items in the array, average the two medians:
    let lowerMedianIndex = 0;
    let upperMedianIndex = 0;
    // 3. Find the medians in the upper and lower half of the split array

    if (sortMetrics.length % 2 === 0)
    {
      const position = sortMetrics.length * 0.5;
      // (1-2-3-4-5) (6-7-8-9-10)
      // (1 2 3) (4 5 6)
      lowerMedianIndex = Math.floor(position * 0.5);
      upperMedianIndex = Math.floor((position) * 0.5) + position;
    }
    else
    {
      const position = Math.floor(sortMetrics.length * 0.5) + 1;

      // (1234) 5 (6789)
      // (1 2) 3 (4 5)
      lowerMedianIndex = Math.floor(position * 0.5) - 1;
      upperMedianIndex = (Math.floor((position) * 0.5) + position) - 1;
    }

     // 4. Subtract the lower median (Q1) from the upper median (Q3) i.e., Q3 - Q1
      // Gives us IQR
      // 5. IQR * 1.5
    const quartile1 = sortMetrics[lowerMedianIndex].getMetric(metric);

    const iqr = (sortMetrics[upperMedianIndex].getMetric(metric) - quartile1) * 1.5;
     // 6. Lower fence = Q1 - IQR
    const lowerFence = quartile1 - iqr;

     // 7. Look through sorted list, any value lower than the fence gets added to the outliers list
    for (let i = 0; i < sortMetrics.length; i++)
    {
      if (sortMetrics[i].getMetric(metric) < lowerFence)
      {
        // Match the id of the outlier to the id of a track in the playlist:
        this.outlierTracks.push(this.matchID(playlist, sortMetrics[i].id));
      }
      else
      {
        break;
      }
    }
  }

  matchID(playlist: Playlist, id: string): Track {
    let toReturn: Track = null;
    for (const track of playlist.tracks) {
      if (track.id === id) {
        toReturn = track;
        break;
      }
    }
    return toReturn;
  }

  private recalculateAverage(rawMetrics: Array<RawMetrics>, metricSelected: string): number
  {
    let total = 0;
    for (const metric of rawMetrics)
    {
      total += metric.getMetric(metricSelected);
    }
    total /= rawMetrics.length;
    return total;
  }

}
