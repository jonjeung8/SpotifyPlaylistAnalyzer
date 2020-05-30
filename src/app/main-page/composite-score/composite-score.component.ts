import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MetricScores } from '../../_models/metricScores';

import { RawMetrics } from '../../_models/RawMetrics';
// oof big import here:
import { IMetricStrategy } from 'src/app/_models/MetricStrategies/IMetricStrategy';
import { DanceabilityStrategy } from 'src/app/_models/MetricStrategies/DanceabilityStrategy';
import { EnergyStrategy } from 'src/app/_models/MetricStrategies/EnergyStrategy';
import { ModeStrategy } from 'src/app/_models/MetricStrategies/ModeStrategy';
import { SpeechinessStrategy } from 'src/app/_models/MetricStrategies/SpeechinessStrategy';
import { AcousticnessStrategy } from 'src/app/_models/MetricStrategies/AcousticnessStrategy';
import { InstrumentalnessStrategy } from 'src/app/_models/MetricStrategies/InstrumentalnessStrategy';
import { LivenessStrategy } from 'src/app/_models/MetricStrategies/LivenessStrategy';
import { ValenceStrategy } from 'src/app/_models/MetricStrategies/ValenceStrategy';
import { TempoStrategy } from 'src/app/_models/MetricStrategies/TempoStrategy';
import { TimeSignatureStrategy } from 'src/app/_models/MetricStrategies/TimeSignatureStrategy';
import { DurationStrategy } from 'src/app/_models/MetricStrategies/DurationStrategy';

// imports html and css files
@Component({
  selector: 'app-composite-score',
  templateUrl: './composite-score.component.html',
  styleUrls: ['./composite-score.component.css']
})

export class CompositeScoreComponent implements OnInit {
  // declared variables
  metricsDisplay: string; // metric selected in dropdown
  compositeScoreTitle: string; // Title associated with the type of metric being displayed
  compositeScore: string; // the composite score in string
  average: number;  // The raw value from the average metrics

  compositeAcousticnessScore: string;  // The string from the composite metrics
  compositeDanceabilityScore: string;  // The string from the composite metrics
  compositeDurationScore: string;  // The string from the composite metrics
  compositeEnergyScore: string;  // The string from the composite metrics
  compositeInstrumentalnessScore: string;  // The string from the composite metrics
  compositeLivenessScore: string;  // The string from the composite metrics
  compositeModeScore: string;  // The string from the composite metrics
  compositeSpeechinessScore: string;  // The string from the composite metrics
  compositeTempoScore: string;  // The string from the composite metrics
  compositeTimeSignatureScore: string;  // The string from the composite metrics
  compositeValenceScore: string;  // The string from the composite metrics

  compositeAcousticnessTitle: string;  // The Title associated with the composite metrics
  compositeDanceabilityTitle: string;  // The Title associated with the composite metrics
  compositeDurationTitle: string;  // The Title associated with the composite metrics
  compositeEnergyTitle: string;  // The Title associated with the composite metrics
  compositeInstrumentalnessTitle: string;  // The Title associated with the composite metrics
  compositeLivenessTitle: string;  // The Title associated with the composite metrics
  compositeModeTitle: string;  // The Title associated with the composite metrics
  compositeSpeechinessTitle: string;  // The Title associated with the composite metrics
  compositeTempoTitle: string;  // The Title associated with the composite metrics
  compositeTimeSignatureTitle: string;  // The Title associated with the composite metrics
  compositeValenceTitle: string;  // The Title associated with the composite metrics
  
  @Output() OutliersRequested = new EventEmitter<boolean>();

  getOutliers() {
    this.OutliersRequested.emit(true);
    console.log('getOutliers has been called');
  }

  constructor() { }

  ngOnInit(): void {
  }

  CalculateAllMetrics(arrayOfMetrics: Array<RawMetrics>)
  {
    let lengthOfPlaylist = arrayOfMetrics.length;
    let totalAcousticness = 0;
    let totalDanceability = 0;
    let totalDuration = 0;
    let totalEnergy = 0;
    let totalInstrumentalness = 0;
    let totalLiveness = 0;
    let totalMode = 0;
    let totalSpeechiness = 0;
    let totalTempo = 0;
    let totalTimeSignature = 0;
    let totalValence = 0;

    for (const trackMetric of arrayOfMetrics)
    {
      totalAcousticness += trackMetric.acousticness;
      totalDanceability += trackMetric.danceability;
      totalDuration += trackMetric.duration_ms;
      totalEnergy += trackMetric.energy;
      if (trackMetric.instrumentalness > 0.2)
      {
        totalInstrumentalness += 1;
      }
      if (trackMetric.liveness > 0.4)
      {
        totalLiveness += 1;
      }
      totalMode += trackMetric.mode;
      totalSpeechiness += trackMetric.speechiness;
      totalTempo += trackMetric.tempo;
      totalTimeSignature += trackMetric.time_signature;
      totalValence += trackMetric.valence;
    }

    let averageAcousticness = totalAcousticness / lengthOfPlaylist;
    let averageDanceability = totalDanceability / lengthOfPlaylist;
    let averageDuration = totalDuration / lengthOfPlaylist;
    let averageEnergy = totalEnergy / lengthOfPlaylist;
    let averageInstrumentalness = totalInstrumentalness / lengthOfPlaylist;
    let averageLiveness = totalLiveness / lengthOfPlaylist;
    let averageMode = totalMode / lengthOfPlaylist;
    let averageSpeechiness = totalSpeechiness / lengthOfPlaylist;
    let averageTempo = totalTempo / lengthOfPlaylist;
    let averageTimeSignature = totalTimeSignature / lengthOfPlaylist;
    let averageValence = totalValence / lengthOfPlaylist;

    let AcousticnessMetricStrategy = new AcousticnessStrategy();
    let DanceabilityMetricStrategy = new DanceabilityStrategy();
    let DurationMetricStrategy = new DurationStrategy();
    let EnergyMetricStrategy = new EnergyStrategy();
    let InstrumentalnessMetricStrategy = new InstrumentalnessStrategy();
    let LivenessMetricStrategy = new LivenessStrategy();
    let ModeMetricStrategy = new ModeStrategy();
    let SpeechinessMetricStrategy = new SpeechinessStrategy();
    let TempoMetricStrategy = new TempoStrategy();
    let TimeSignatureMetricStrategy = new TimeSignatureStrategy();
    let ValenceMetricStrategy = new ValenceStrategy();

    this.compositeAcousticnessScore = AcousticnessMetricStrategy.GetDisplayTitle();
    this.compositeAcousticnessTitle = AcousticnessMetricStrategy.ConvertToValue(averageAcousticness);
    this.compositeDanceabilityScore = DanceabilityMetricStrategy.GetDisplayTitle();
    this.compositeDanceabilityTitle = DanceabilityMetricStrategy.ConvertToValue(averageDanceability);
    this.compositeDurationScore = DurationMetricStrategy.GetDisplayTitle();
    this.compositeDurationTitle = DurationMetricStrategy.ConvertToValue(averageDuration);
    this.compositeEnergyScore = EnergyMetricStrategy.GetDisplayTitle();
    this.compositeEnergyTitle = EnergyMetricStrategy.ConvertToValue(averageEnergy);
    this.compositeInstrumentalnessScore = InstrumentalnessMetricStrategy.GetDisplayTitle();
    this.compositeInstrumentalnessTitle = InstrumentalnessMetricStrategy.ConvertToValue(averageInstrumentalness);
    this.compositeLivenessScore = LivenessMetricStrategy.GetDisplayTitle();
    this.compositeLivenessTitle = LivenessMetricStrategy.ConvertToValue(averageLiveness);
    this.compositeModeScore = ModeMetricStrategy.GetDisplayTitle();
    this.compositeModeTitle = ModeMetricStrategy.ConvertToValue(averageMode);
    this.compositeSpeechinessScore = SpeechinessMetricStrategy.GetDisplayTitle();
    this.compositeSpeechinessTitle = SpeechinessMetricStrategy.ConvertToValue(averageSpeechiness);
    this.compositeTempoScore = TempoMetricStrategy.GetDisplayTitle();
    this.compositeTempoTitle = TempoMetricStrategy.ConvertToValue(averageTempo);
    this.compositeTimeSignatureScore = TimeSignatureMetricStrategy.GetDisplayTitle();
    this.compositeTimeSignatureTitle = TimeSignatureMetricStrategy.ConvertToValue(averageTimeSignature);
    this.compositeValenceScore = ValenceMetricStrategy.GetDisplayTitle();
    this.compositeValenceTitle = ValenceMetricStrategy.ConvertToValue(averageValence);
    
    console.log(this.compositeAcousticnessScore);
    console.log(this.compositeAcousticnessTitle);
    console.log(this.compositeDanceabilityScore);
    console.log(this.compositeDanceabilityTitle);
    console.log(this.compositeDurationScore);
    console.log(this.compositeDurationTitle);
    console.log(this.compositeEnergyScore);
    console.log(this.compositeEnergyTitle);
    console.log(this.compositeInstrumentalnessScore);
    console.log(this.compositeInstrumentalnessTitle);
    console.log(this.compositeLivenessScore);
    console.log(this.compositeLivenessTitle);
    console.log(this.compositeModeScore);
    console.log(this.compositeModeTitle);
    console.log(this.compositeSpeechinessScore);
    console.log(this.compositeSpeechinessTitle);
    console.log(this.compositeTempoScore);
    console.log(this.compositeTempoTitle);
    console.log(this.compositeTimeSignatureScore);
    console.log(this.compositeTimeSignatureTitle);
    console.log(this.compositeValenceScore);
    console.log(this.compositeValenceTitle);
    
    /*/console.log(this.averageAcousticness);
    console.log(this.averageDanceability);
    console.log(this.averageDuration);
    console.log(this.averageEnergy);
    console.log(this.averageInstrumentalness);
    console.log(this.averageLiveness);
    console.log(this.averageMode);
    console.log(this.averageSpeechiness);
    console.log(this.averageTempo);
    console.log(this.averageTimeSignature);
    console.log(this.averageValence); //*/
  }

  CalculateCompositeScore(arrayOfMetrics: Array<RawMetrics>, categorySelected: string)
  {
    // store the element selected
    this.metricsDisplay = categorySelected;
    console.log('Hey I made it to calculating composite score');
    // iterate over the array of metrics
    // pull the values of the selected metric into a new array to perform stats
    // we need an average to get started
    // add outliers here later
    let total = 0;

    for (const trackMetric of arrayOfMetrics)
    {
      switch (this.metricsDisplay)
      {
        case 'danceability':
          {
            total += trackMetric.danceability;
            break;
          }
        case 'energy':
          {
            total += trackMetric.energy;
            break;
          }
        case 'mode':
          {
            total += trackMetric.mode;
            break;
          }
        case 'speechiness':
          {
            total += trackMetric.speechiness;
            break;
          }
        case 'acousticness':
          {
            total += trackMetric.acousticness;
            break;
          }
        case 'instrumentalness':
          {
            if (trackMetric.instrumentalness > 0.2)
            {
              total += 1;
            }
            // total += trackMetric.instrumentalness;
            break;
          }
        case 'liveness':
          {
            if (trackMetric.liveness > 0.4)
            {
              total += 1;
            }
            // total += trackMetric.liveness;
            break;
          }
        case 'valence':
          {
            total += trackMetric.valence;
            break;
          }
        case 'tempo':
          {
            total += trackMetric.tempo;
            break;
          }
        case 'time_signature':
          {
            total += trackMetric.time_signature;
            break;
          }
        case 'duration_ms':
          {
            total += trackMetric.duration_ms;
            break;
          }
        default:
          {
            console.log('hello, I\'ve experienced an error somehow, or the user didn\'t select a category');
          }
      }

    }
    console.log(total);
    console.log(arrayOfMetrics.length);

    // this.compositeScore = parseFloat((total / arrayOfMetrics.length).toFixed(2)).toFixed(2);
    this.average = total / arrayOfMetrics.length;

    console.log('Average: ' + this.average);

    this.ConvertMetricToValue();
    // console.log(this.compositeScore);
    // console.log(average);
    // (<HTMLSelectElement>document.getElementById('metricSelected')).value = "0";
    // TODO: add valueable stats to user here (standard deviation, regression analysis)
    // TODO: get fix for CORS policy error
  }


  ConvertMetricToValue()
  {
    // Convert metric to a valuable piece of information to a user:
      // Tabled:
        // Loudness float between -60 and 0 convert to decibels
        // Valence normal curve mean of 0.5, speaks to positiveness of a given song

    // */

    let metricStrategy: IMetricStrategy;

    switch (this.metricsDisplay)
      {
        case 'danceability':
          {
            metricStrategy = new DanceabilityStrategy();
            break;
          }
        case 'energy':
          {
            metricStrategy = new EnergyStrategy();
            break;
          }
        case 'mode':
          {
            metricStrategy = new ModeStrategy();
            break;
          }
        case 'speechiness':
          {
            metricStrategy = new SpeechinessStrategy();
            break;
          }
        case 'acousticness':
          {
            metricStrategy = new AcousticnessStrategy();
            break;
          }
        case 'instrumentalness':
          {
            metricStrategy = new InstrumentalnessStrategy();
            break;
          }
        case 'liveness':
          {
            metricStrategy = new LivenessStrategy();
            break;
          }
        case 'valence':
          {
            metricStrategy = new ValenceStrategy();
            break;
          }
        case 'tempo':
          {
            metricStrategy = new TempoStrategy();
            break;
          }
        case 'time_signature':
          {
            metricStrategy = new TimeSignatureStrategy();
            break;
          }
        case 'duration_ms':
          {
            metricStrategy = new DurationStrategy();
            break;
          }
        default:
          {
            console.log('hello, I\'ve experienced an error somehow, or the user didn\'t select a category');
            metricStrategy = undefined;
          }
      }

    if (metricStrategy)
      {
        this.compositeScoreTitle = metricStrategy.GetDisplayTitle();
        this.compositeScore = metricStrategy.ConvertToValue(this.average);
      }
    // */
  }
}
