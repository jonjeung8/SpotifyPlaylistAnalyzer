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
    // Helpers for mean calculation that piggy-backs off this method:
    let rawInstrumentalness = 0;
    let rawLiveness = 0;

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

      rawInstrumentalness += trackMetric.instrumentalness;
      rawLiveness += trackMetric.liveness;
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

    // Helper for calculating the synergy score: this will be passed through as 
    // The data representing the mean of every metric:
    let meanTrack = new RawMetrics();
    meanTrack.acousticness = averageAcousticness;
    meanTrack.danceability = averageDanceability;
    meanTrack.duration_ms = averageDuration;
    meanTrack.energy = averageEnergy;
    meanTrack.instrumentalness = rawInstrumentalness / lengthOfPlaylist;
    meanTrack.liveness = rawLiveness / lengthOfPlaylist;
    meanTrack.mode = averageMode;
    meanTrack.speechiness = averageSpeechiness;
    meanTrack.tempo = averageTempo;
    meanTrack.time_signature = averageTimeSignature;
    meanTrack.valence = averageValence;


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


    // Calculate the Synergy score:
    this.CalculateSynergyScore(meanTrack, arrayOfMetrics);

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


  CalculateSynergyScore(meanRawMetrics : RawMetrics, arrayOfMetrics: Array<RawMetrics>)
  {

    // 0. If the length is only 1, save a divide by 0 headache and just make it 100%:
    if(arrayOfMetrics.length < 2)
    {
      this.synergyAverage = 1;
      this.synergyScore = "100%";
      return;
    }

    // 1. Calculate the variance for all values:
    const variancePerMetric : RawMetrics = this.CalculateVariance(meanRawMetrics, arrayOfMetrics);

    // 2. Calculate the ratio between a given variance and mean (variance / mean)
    const varianceRatioPerMetric : RawMetrics = this.CalculateRatioPerVariance(variancePerMetric, meanRawMetrics);
    console.log("=================");
    console.log(varianceRatioPerMetric);

    // 3. Average the ratios into one value
    let averageRatio = 0;
    averageRatio += varianceRatioPerMetric.acousticness;
    averageRatio += varianceRatioPerMetric.danceability;
    //averageRatio += varianceRatioPerMetric.duration_ms;
    averageRatio += varianceRatioPerMetric.energy;
    averageRatio += varianceRatioPerMetric.instrumentalness;
    averageRatio += varianceRatioPerMetric.liveness;
    averageRatio += varianceRatioPerMetric.mode;
    averageRatio += varianceRatioPerMetric.speechiness;
    //averageRatio += varianceRatioPerMetric.tempo;
    averageRatio += varianceRatioPerMetric.time_signature;
    averageRatio += varianceRatioPerMetric.valence;

    // FIXME: Magic number alert: 11 == number of metrics we track
    averageRatio /= 9;

    console.log("Average ratio: " + averageRatio);

    // 4. Subtract from 1
    const rawSynergy = 1 - averageRatio;
    console.log("Raw Synergy: " + rawSynergy);

    // 5. Use a smoothstep / sigmoid-family function to make it pretty :)
    this.synergyAverage = this.SmoothStep(rawSynergy);
    console.log("Synergy Average: " + this.synergyAverage);

    // TODO: Determine if this is x/10 or %. Using percent for now.
    this.synergyScore = `${(this.synergyAverage*100).toFixed(2)}%`;

    // Cartman's 4-point plan:
    // start up
    // cash in
    // sell out
    // bro down.
  }

  private CalculateVariance(meanRawMetrics: RawMetrics, arrayOfMetrics: Array<RawMetrics>) : RawMetrics
  {
    //===============================
    //
    // Variance Calculation:
    //
    // SUM((Xi - Xmean)^2) / (n - 1)
    //
    //===============================

    // 1. Form return data:
    const varianceOfMetrics: RawMetrics = new RawMetrics();
    varianceOfMetrics.acousticness = 0;
    varianceOfMetrics.danceability = 0;
    varianceOfMetrics.duration_ms = 0;
    varianceOfMetrics.energy = 0;
    varianceOfMetrics.instrumentalness = 0;
    varianceOfMetrics.liveness = 0;
    varianceOfMetrics.mode = 0;
    varianceOfMetrics.speechiness = 0;
    varianceOfMetrics.tempo = 0;
    varianceOfMetrics.time_signature = 0;
    varianceOfMetrics.valence = 0;

    // 2. For each metric in the array, sum  (current - mean) and square it.
    for(const track of arrayOfMetrics)
    {
      varianceOfMetrics.acousticness += (Math.pow((track.acousticness - meanRawMetrics.acousticness), 2));
      varianceOfMetrics.danceability +=( Math.pow((track.danceability - meanRawMetrics.danceability), 2));
      varianceOfMetrics.duration_ms += (Math.pow((track.duration_ms - meanRawMetrics.duration_ms), 2));
      varianceOfMetrics.energy +=( Math.pow((track.energy - meanRawMetrics.energy), 2));
      varianceOfMetrics.instrumentalness += (Math.pow((track.instrumentalness - meanRawMetrics.instrumentalness), 2));
      varianceOfMetrics.liveness +=( Math.pow((track.liveness - meanRawMetrics.liveness), 2));
      varianceOfMetrics.mode += (Math.pow((track.mode - meanRawMetrics.mode), 2));
      varianceOfMetrics.speechiness +=( Math.pow((track.speechiness - meanRawMetrics.speechiness), 2));
      varianceOfMetrics.tempo +=( Math.pow((track.tempo - meanRawMetrics.tempo), 2));
      varianceOfMetrics.time_signature += (Math.pow((track.time_signature - meanRawMetrics.time_signature), 2));
      varianceOfMetrics.valence +=( Math.pow((track.valence - meanRawMetrics.valence), 2));
      
    }

    // 3. divide each metric by n - 1 number of elements:
    // FIXME: What about a playlist of 0 or 1 songs? should it even make it to this point?
    const recipSongCount = 1 / (arrayOfMetrics.length - 1);

    varianceOfMetrics.acousticness *= recipSongCount;
    varianceOfMetrics.danceability *= recipSongCount;
    varianceOfMetrics.duration_ms *= recipSongCount;
    varianceOfMetrics.energy *= recipSongCount;
    varianceOfMetrics.instrumentalness *= recipSongCount;
    varianceOfMetrics.liveness *= recipSongCount;
    varianceOfMetrics.mode *= recipSongCount;
    varianceOfMetrics.speechiness *= recipSongCount;
    varianceOfMetrics.tempo *= recipSongCount;
    varianceOfMetrics.time_signature *= recipSongCount;
    varianceOfMetrics.valence *= recipSongCount;

    // Give it back:
    return varianceOfMetrics;
  }

  private CalculateRatioPerVariance(varianceMetrics: RawMetrics, meanRawMetrics: RawMetrics) : RawMetrics
  {
    const ratioMetrics : RawMetrics = new RawMetrics();

    ratioMetrics.acousticness = varianceMetrics.acousticness / meanRawMetrics.acousticness;
    ratioMetrics.danceability = varianceMetrics.danceability / meanRawMetrics.danceability;
    ratioMetrics.duration_ms = varianceMetrics.duration_ms / meanRawMetrics.duration_ms;
    ratioMetrics.energy = varianceMetrics.energy / meanRawMetrics.energy;
    ratioMetrics.instrumentalness = varianceMetrics.instrumentalness / meanRawMetrics.instrumentalness;
    ratioMetrics.liveness = varianceMetrics.liveness / meanRawMetrics.liveness;
    ratioMetrics.mode = varianceMetrics.mode / meanRawMetrics.mode;
    ratioMetrics.speechiness = varianceMetrics.speechiness / meanRawMetrics.speechiness;
    ratioMetrics.tempo = varianceMetrics.tempo / meanRawMetrics.tempo;
    ratioMetrics.time_signature = varianceMetrics.time_signature / meanRawMetrics.time_signature;
    ratioMetrics.valence = varianceMetrics.valence / meanRawMetrics.valence;

    return ratioMetrics;
  }

  private SmoothStep(value : number) : number
  {

    // Early outs:
    if(value >= 1)
    {
      return 1;
    }
    else if(value <= 0)
    {
      return 0;
    }

    // Borrowing this formula:
    // Play around with it to understand the moving parts:
    // https://www.desmos.com/calculator/3zhzwbfrxd

    // We can adjust s, but STAY BETWEEN 0 AND 1
    // The world will explode otherwise..
    // Guide:
    //    0 = linear line from 0 to 1 (x == y)
    //    0.5 = traditional S-curve (default)
    //    0.9999... essentially an instantaneous step from 0 to 1 on the Y axis.

    // 0 <= s < 1
    const s = 0.1;
    const curve = (2 / (1 - s)) - 1;

    let res = 0;

    // Lower half of the curve:
    if(value < 0.5)
    {
      res = this.SmoothStepHelper(value, 0.5, curve);
    }
    // Upper half of the curve (inverse calculation)
    else
    {
      res = 1 - this.SmoothStepHelper(1 - value, 0.5, curve);
    }

    return res;
  }

  private SmoothStepHelper(x: number, centerPoint: number, curve :number)
  {
    //===================
    //
    //    x^c
    //    ---
    //   n^(c - 1)
    //
    //===================

    return (Math.pow(x, curve) / Math.pow(centerPoint, curve - 1));
  }
}
