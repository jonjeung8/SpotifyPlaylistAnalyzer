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

  compositeAcousticnessBar: string;  // The bar from the composite metrics
  compositeDanceabilityBar: string;  // The bar from the composite metrics
  compositeDurationBar: string;  // The bar from the composite metrics
  compositeEnergyBar: string;  // The bar from the composite metrics
  compositeInstrumentalnessBar: string;  // The bar from the composite metrics
  compositeLivenessBar: string;  // The bar from the composite metrics
  compositeModeBar: string;  // The bar from the composite metrics
  compositeSpeechinessBar: string;  // The bar from the composite metrics
  compositeTempoBar: string;  // The bar from the composite metrics
  compositeTimeSignatureBar: string;  // The bar from the composite metrics
  compositeValenceBar: string;  // The bar from the composite metrics

  hideMetrics: boolean;

  @Output() OutliersRequested = new EventEmitter<string>();

  getOutliers(metric: string) { 
    this.hideMetrics = true;
    this.OutliersRequested.emit(metric);
    //this.hideMetrics = true;
    console.log('getOutliers has been called');
  }

  constructor() { }

  ngOnInit(): void {
    this.hideMetrics = false;
  }

  CalculateAllMetrics(arrayOfMetrics: Array<RawMetrics>)
  {
    const lengthOfPlaylist = arrayOfMetrics.length;
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

    const averageAcousticness = totalAcousticness / lengthOfPlaylist;
    const averageDanceability = totalDanceability / lengthOfPlaylist;
    const averageDuration = totalDuration / lengthOfPlaylist;
    const averageEnergy = totalEnergy / lengthOfPlaylist;
    const averageInstrumentalness = totalInstrumentalness / lengthOfPlaylist;
    const averageLiveness = totalLiveness / lengthOfPlaylist;
    const averageMode = totalMode / lengthOfPlaylist;
    const averageSpeechiness = totalSpeechiness / lengthOfPlaylist;
    const averageTempo = totalTempo / lengthOfPlaylist;
    const averageTimeSignature = totalTimeSignature / lengthOfPlaylist;
    const averageValence = totalValence / lengthOfPlaylist;

    const AcousticnessMetricStrategy = new AcousticnessStrategy();
    const DanceabilityMetricStrategy = new DanceabilityStrategy();
    const DurationMetricStrategy = new DurationStrategy();
    const EnergyMetricStrategy = new EnergyStrategy();
    const InstrumentalnessMetricStrategy = new InstrumentalnessStrategy();
    const LivenessMetricStrategy = new LivenessStrategy();
    const ModeMetricStrategy = new ModeStrategy();
    const SpeechinessMetricStrategy = new SpeechinessStrategy();
    const TempoMetricStrategy = new TempoStrategy();
    const TimeSignatureMetricStrategy = new TimeSignatureStrategy();
    const ValenceMetricStrategy = new ValenceStrategy();

    this.compositeAcousticnessTitle = AcousticnessMetricStrategy.GetDisplayTitle();
    this.compositeAcousticnessScore = AcousticnessMetricStrategy.ConvertToValue(averageAcousticness);
    this.compositeAcousticnessBar = AcousticnessMetricStrategy.ConvertToBar(averageAcousticness);
    this.compositeDanceabilityTitle = DanceabilityMetricStrategy.GetDisplayTitle();
    this.compositeDanceabilityScore = DanceabilityMetricStrategy.ConvertToValue(averageDanceability);
    this.compositeDanceabilityBar = DanceabilityMetricStrategy.ConvertToBar(averageDanceability);
    this.compositeDurationTitle = DurationMetricStrategy.GetDisplayTitle();
    this.compositeDurationScore = DurationMetricStrategy.ConvertToValue(averageDuration);
    this.compositeDurationBar = DurationMetricStrategy.ConvertToBar(averageDuration);
    this.compositeEnergyTitle = EnergyMetricStrategy.GetDisplayTitle();
    this.compositeEnergyScore = EnergyMetricStrategy.ConvertToValue(averageEnergy);
    this.compositeEnergyBar = EnergyMetricStrategy.ConvertToBar(averageEnergy);
    this.compositeInstrumentalnessTitle = InstrumentalnessMetricStrategy.GetDisplayTitle();
    this.compositeInstrumentalnessScore = InstrumentalnessMetricStrategy.ConvertToValue(averageInstrumentalness);
    this.compositeInstrumentalnessBar = InstrumentalnessMetricStrategy.ConvertToBar(averageInstrumentalness);
    this.compositeLivenessTitle = LivenessMetricStrategy.GetDisplayTitle();
    this.compositeLivenessScore = LivenessMetricStrategy.ConvertToValue(averageLiveness);
    this.compositeLivenessBar = LivenessMetricStrategy.ConvertToBar(averageLiveness);
    this.compositeModeTitle = ModeMetricStrategy.GetDisplayTitle();
    this.compositeModeScore = ModeMetricStrategy.ConvertToValue(averageMode);
    this.compositeModeBar = ModeMetricStrategy.ConvertToBar(averageMode);
    this.compositeSpeechinessTitle = SpeechinessMetricStrategy.GetDisplayTitle();
    this.compositeSpeechinessScore = SpeechinessMetricStrategy.ConvertToValue(averageSpeechiness);
    this.compositeSpeechinessBar = SpeechinessMetricStrategy.ConvertToBar(averageSpeechiness);
    this.compositeTempoTitle = TempoMetricStrategy.GetDisplayTitle();
    this.compositeTempoScore = TempoMetricStrategy.ConvertToValue(averageTempo);
    this.compositeTempoBar = TempoMetricStrategy.ConvertToBar(averageTempo);
    this.compositeTimeSignatureTitle = TimeSignatureMetricStrategy.GetDisplayTitle();
    this.compositeTimeSignatureScore = TimeSignatureMetricStrategy.ConvertToValue(averageTimeSignature);
    this.compositeTimeSignatureBar =TimeSignatureMetricStrategy.ConvertToBar(averageTimeSignature);
    this.compositeValenceTitle = ValenceMetricStrategy.GetDisplayTitle();
    this.compositeValenceScore = ValenceMetricStrategy.ConvertToValue(averageValence);
    this.compositeValenceBar = ValenceMetricStrategy.ConvertToBar(averageValence);
    /*/
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
    //*/
  }
}
