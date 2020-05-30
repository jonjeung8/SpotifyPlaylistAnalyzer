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
  // TODO: (Sum of least squares variables needed)
  // HEY PAY ATTENTION TO THE COMMENTS HERE!!!
  synergyScore: string; // TODO: overall playlist score (used in composite score html)
  synergyAverage: number;  // TODO: overall playlist score (used in composite score html)

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

    this.compositeAcousticnessTitle = AcousticnessMetricStrategy.GetDisplayTitle();
    this.compositeAcousticnessScore = AcousticnessMetricStrategy.ConvertToValue(averageAcousticness);
    this.compositeDanceabilityTitle = DanceabilityMetricStrategy.GetDisplayTitle();
    this.compositeDanceabilityScore = DanceabilityMetricStrategy.ConvertToValue(averageDanceability);
    this.compositeDurationTitle = DurationMetricStrategy.GetDisplayTitle();
    this.compositeDurationScore = DurationMetricStrategy.ConvertToValue(averageDuration);
    this.compositeEnergyTitle = EnergyMetricStrategy.GetDisplayTitle();
    this.compositeEnergyScore = EnergyMetricStrategy.ConvertToValue(averageEnergy);
    this.compositeInstrumentalnessTitle = InstrumentalnessMetricStrategy.GetDisplayTitle();
    this.compositeInstrumentalnessScore = InstrumentalnessMetricStrategy.ConvertToValue(averageInstrumentalness);
    this.compositeLivenessTitle = LivenessMetricStrategy.GetDisplayTitle();
    this.compositeLivenessScore = LivenessMetricStrategy.ConvertToValue(averageLiveness);
    this.compositeModeTitle = ModeMetricStrategy.GetDisplayTitle();
    this.compositeModeScore = ModeMetricStrategy.ConvertToValue(averageMode);
    this.compositeSpeechinessTitle = SpeechinessMetricStrategy.GetDisplayTitle();
    this.compositeSpeechinessScore = SpeechinessMetricStrategy.ConvertToValue(averageSpeechiness);
    this.compositeTempoTitle = TempoMetricStrategy.GetDisplayTitle();
    this.compositeTempoScore = TempoMetricStrategy.ConvertToValue(averageTempo);
    this.compositeTimeSignatureTitle = TimeSignatureMetricStrategy.GetDisplayTitle();
    this.compositeTimeSignatureScore = TimeSignatureMetricStrategy.ConvertToValue(averageTimeSignature);
    this.compositeValenceTitle = ValenceMetricStrategy.GetDisplayTitle();
    this.compositeValenceScore = ValenceMetricStrategy.ConvertToValue(averageValence);
    
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
}
