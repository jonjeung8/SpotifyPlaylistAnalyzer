import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeScoreComponent } from './composite-score.component';
import { Category } from '../../_models/category';
import { RawMetrics } from 'src/app/_models/RawMetrics';

describe('CompositeScoreComponent', () => {
  let component: CompositeScoreComponent;
  let fixture: ComponentFixture<CompositeScoreComponent>;
  let rawMetricsMax: Array<RawMetrics>;
  let rawMetricsMin: Array<RawMetrics>;
  let rawMetricsBoundary: Array<RawMetrics>;
  let rawMetricsSynergyMin: Array<RawMetrics>;

  beforeAll(() => {
    // rough maximum of each metric to reduce repeating loops
    rawMetricsMax = new Array<RawMetrics>();
    for (let i = 0; i < 10; i++)
    {
      const tmpMetrics = new RawMetrics();
      tmpMetrics.acousticness = 0.9951;
      tmpMetrics.danceability = 0.9951;
      tmpMetrics.duration_ms = 376000;
      tmpMetrics.energy = 0.9951;
      tmpMetrics.instrumentalness = 0.9951;
      tmpMetrics.liveness = 0.9951;
      tmpMetrics.mode = 0.9951;
      tmpMetrics.speechiness = 0.67;
      tmpMetrics.tempo = 185;
      tmpMetrics.time_signature = 4.001;
      tmpMetrics.valence = 0.9951;
      rawMetricsMax.push(tmpMetrics);
    }
    // rough minimum below boundaries of each metric to reduce repeating loops
    rawMetricsMin = new Array<RawMetrics>();
    for (let i = 0; i < 10; i++)
    {
      const tmpMetrics = new RawMetrics();
      tmpMetrics.acousticness = 0.001;
      tmpMetrics.danceability = 0.001;
      tmpMetrics.duration_ms = 6000;
      tmpMetrics.energy = 0.001;
      tmpMetrics.instrumentalness = 0.20;
      tmpMetrics.liveness = 0.40;
      tmpMetrics.mode = 0.5;
      tmpMetrics.speechiness = 0.33;
      tmpMetrics.time_signature = 3.995;
      tmpMetrics.valence = 0.5;
      rawMetricsMin.push(tmpMetrics);
    }
    // rough boundary cases of each metric to reduce repeating loops
    rawMetricsBoundary = new Array<RawMetrics>();
    for (let i = 0; i < 10; i++)
    {
      const tmpMetrics = new RawMetrics();
      tmpMetrics.duration_ms = 66000;
      tmpMetrics.instrumentalness = 0.21;
      tmpMetrics.liveness = 0.41;
      tmpMetrics.mode = 0.51;
      tmpMetrics.speechiness = 0.66;
      tmpMetrics.valence = 0.51;
      rawMetricsBoundary.push(tmpMetrics);
    }

    rawMetricsSynergyMin = new Array<RawMetrics>();
    for (let i = 0; i < 1; i++)
    {
      const tmpMetrics = new RawMetrics();
      tmpMetrics.duration_ms = 66000;
      tmpMetrics.instrumentalness = 0.21;
      tmpMetrics.liveness = 0.41;
      tmpMetrics.mode = 0.51;
      tmpMetrics.speechiness = 0.66;
      tmpMetrics.valence = 0.51;
      rawMetricsSynergyMin.push(tmpMetrics);

    }

  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeScoreComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create composite score component', () => {
    expect(component).toBeTruthy();
  });

  // ========================
  //      Accousticeness
  // ========================
  // Accousticness Convert To Value tests maximum
  it('should output value data for acousticness (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeAcousticnessScore).toBe('10/10');
  });

  // Accousticness Convert To Value tests minimum
  it('should output value data for acousticness (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeAcousticnessScore).toBe('0/10');
  });

  // Accounsticness Get Display Title
  it('should change the title to acousticness (good input max/min)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeAcousticnessTitle).toBe('Acousticness Rating');
  });

  // ========================
  //      Danceability
  // ========================
  // Danceability Convert To Value tests maximum
  it('should output value data for danceability (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeDanceabilityScore).toBe('10/10');
  });

  // Danceability Convert To Value tests minimum
  it('should output value data for danceability (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeDanceabilityScore).toBe('0/10');
  });

  // Danceability Get Display Title
  it('should change the title to danceability (good input max/min)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeDanceabilityTitle).toBe('Danceability Rating');
  });

  // ========================
  //      Duration
  // ========================
  // Duration Convert To Value tests maximum
  it('should output value data for duration (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeDurationScore).toBe('6:16');
  });

  // Duration Convert To Value tests minimum
  it('should output value data for duration (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeDurationScore).toBe('0:06');
  });

  // Duration Convert To Value tests boundary
  it('should output value data for duration (good input boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsBoundary);
    // Assert
    expect(component.compositeDurationScore).toBe('1:06');
  });

  // Duration Get Display Title
  it('should change the title to duration (good input max/min/boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeDurationTitle).toBe('Average Song Length');
  });

  // ========================
  //      Energy
  // ========================
  // Energy Convert To Value tests maximum
  it('should output value data for energy (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeEnergyScore).toBe('100%');
  });

  // Energy Convert To Value tests minimum
  it('should output value data for energy (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeEnergyScore).toBe('0%');
  });

  // Energy Get Display Title
  it('should change the title to energy (good input max/min)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeEnergyTitle).toBe('Percent Energetic');
  });

  // ========================
  //      Instrumentalness
  // ========================
  // Instrumentalness Convert To Value tests maximum
  it('should output value data for instrumentalness (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeInstrumentalnessScore).toBe('100%');
  });

  // Instrumentalness Convert To Value tests minimum
  it('should output value data for instrumentalness (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeInstrumentalnessScore).toBe('0%');
  });

  // Instrumentalness Convert To Value tests Boundary
  it('should output value data for instrumentalness (good input boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsBoundary);
    // Assert
    expect(component.compositeInstrumentalnessScore).toBe('100%');
  });

  // Instrumentalness Get Display Title
  it('should change the title to instrumentalness (good input max/min/boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeInstrumentalnessTitle).toBe('Percent of Tracks that are Instrumental');
  });

  // ========================
  //      Liveness
  // ========================
  // Liveness Convert To Value tests maximum
  it('should output value data for liveness (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeLivenessScore).toBe('100%');
  });

  // Liveness Convert To Value tests minimum
  it('should output value data for liveness (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeLivenessScore).toBe('0%');
  });

  // Liveness Convert To Value tests Boundary
  it('should output value data for liveness (good input boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsBoundary);
    // Assert
    expect(component.compositeLivenessScore).toBe('100%');
  });

  // Liveness Get Display Title
  it('should change the title to liveness (good input max/min/boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeLivenessTitle).toBe('Percent of Tracks Performed Live');
  });

  // ========================
  //      Mode
  // ========================
  // Mode Convert To Value tests maximum
  it('should output value data for mode (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeModeScore).toBe('Major Key');
  });

  // Mode Convert To Value tests minimum
  it('should output value data for mode (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeModeScore).toBe('Minor Key');
  });

  // Mode Convert To Value tests Boundary
  it('should output value data for mode (good input boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsBoundary);
    // Assert
    expect(component.compositeModeScore).toBe('Major Key');
  });

  // Mode Get Display Title
  it('should change the title to mode (good input max/min/boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeModeTitle).toBe('The Majority of Your Songs Are');
  });

  // ========================
  //      Speechiness
  // ========================
  // Speechiness Convert To Value tests maximum
  it('should output value data for speechiness (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeSpeechinessScore).toBe('Spoken Word');
  });

  // Speechiness Convert To Value tests minimum
  it('should output value data for speechiness (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeSpeechinessScore).toBe('Musical Tracks');
  });

  // Speechiness Convert To Value tests Boundary
  it('should output value data for speechiness (good input boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsBoundary);
    // Assert
    expect(component.compositeSpeechinessScore).toBe('Rhythmic Spoken Word');
  });

  // Speechiness Get Display Title
  it('should change the title to speechiness (good input max/min/boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeSpeechinessTitle).toBe('On Average, Tracks in this Playlist Contain');
  });

  // ========================
  //      Tempo
  // ========================
  // Tempo Convert To Value tests maximum
  it('should output value data for tempo (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeTempoScore).toBe('185 bpm');
  });

  // Tempo Get Display Title
  it('should change the title to tempo (good input max)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeTempoTitle).toBe('Average Song Tempo');
  });

  // ========================
  //      Time signature
  // ========================
  // Time signature Convert To Value tests maximum
  it('should output value data for time_signature (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeTimeSignatureScore).toBe('4');
  });

  // Time signature Convert To Value tests minimum
  it('should output value data for time_signature (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeTimeSignatureScore).toBe('4');
  });

  // Time signature Get Display Title
  it('should change the title to time_signature (good input max/min)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeTimeSignatureTitle).toBe('Average Beats per Bar');
  });

  // ========================
  //      Valence
  // ========================
  // Valence Convert To Value tests maximum
  it('should output value data for valence (good input maximum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeValenceScore).toBe('These Songs Spark Joy');
  });

  // Valence Convert To Value tests minimum
  it('should output value data for valence (good input minimum)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMin);
    // Assert
    expect(component.compositeValenceScore).toBe('These Songs Do Not Spark Joy');
  });

  // Valence Convert To Value tests Boundary
  it('should output value data for valence (good input boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsBoundary);
    // Assert
    expect(component.compositeValenceScore).toBe('These Songs Spark Joy');
  });

  // Valence Get Display Title
  it('should change the title to valence (good input max/min/boundary)', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.compositeValenceTitle).toBe('Valence');
  });

  // =========================
  //
  // Synergy Score Tests
  //
  // =========================

  // Single song score average
  it('should result in 1.0 synergy with one song ', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsSynergyMin);
    // Assert
    expect(component.synergyAverage).toBeCloseTo(1.0);
  });
  // Single song score output:
  it('should display 100% syndergy with one song', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsSynergyMin);
    // Assert
    expect(component.synergyScore).toBe('100%');
  });
  // Multi-song score output:
  it('should result in 1.0 synergy with all songs the same', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.synergyAverage).toBeCloseTo(1.0);
  });
  // Multi-song score string:
  it('should result in 1.0 synergy with all songs the same', () => {
    // Arrange
    // Act
    component.CalculateAllMetrics(rawMetricsMax);
    // Assert
    expect(component.synergyScore).toBe('100%');
  });

});
