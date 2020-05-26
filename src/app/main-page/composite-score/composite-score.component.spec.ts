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

  beforeAll(() => {
    //rough maximum of each metric to reduce repeating loops
    rawMetricsMax = new Array<RawMetrics>();
    
    for(let i = 0; i < 10; i++)
    {
      let tmpMetrics = new RawMetrics();
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

    //rough minimum below boundaries of each metric to reduce repeating loops
    rawMetricsMin = new Array<RawMetrics>();
    
    for(let i = 0; i < 10; i++)
    {
      let tmpMetrics = new RawMetrics();
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

    //rough boundary cases of each metric to reduce repeating loops
    rawMetricsBoundary = new Array<RawMetrics>();
    
    for(let i = 0; i < 10; i++)
    {
      let tmpMetrics = new RawMetrics();
      tmpMetrics.duration_ms = 66000;
      tmpMetrics.instrumentalness = 0.21;
      tmpMetrics.liveness = 0.41;
      tmpMetrics.mode = 0.51;
      tmpMetrics.speechiness = 0.66;
      tmpMetrics.valence = 0.51;
      rawMetricsBoundary.push(tmpMetrics); 
    }
  })


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
  // Accousticness Get Average tests Maximum
  it('should calculate the average acousticness (good data maximum)', () => {
    // Arrange
    const metric = 'acousticness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.995);
  });
  
  // Accousticness Get Average tests Minimum
  it('should calculate the average acousticness (good data minimum)', () => {
    // Arrange
    const metric = 'acousticness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.001);
  });

  // Accousticness Convert To Value tests maximum
  it('should output value data for acousticness (good input maximum)', () => {
    // Arrange
    const metric = 'acousticness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('10/10');
  });

  // Accousticness Convert To Value tests minimum
  it('should output value data for acousticness (good input minimum)', () => {
    // Arrange
    const metric = 'acousticness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('0/10');
  });

  // Accounsticness Get Display Title
  it('should change the title to acousticness (good input max/min)', () => {
    // Arrange
    const metric = 'acousticness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Acousticness Rating');
  });

  // ========================
  //      Danceability
  // ========================
  // Danceability Get Average tests Maximum
  it('should calculate the average danceability (good data maximum)', () => {
    // Arrange
    const metric = 'danceability';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.995);
  });

  // Danceability Get Average tests Minimum
  it('should calculate the average danceability (good data minimum)', () => {
    // Arrange
    const metric = 'danceability';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.001);
  });

  // Danceability Convert To Value tests maximum
  it('should output value data for danceability (good input maximum)', () => {
    // Arrange
    const metric = 'danceability';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('10/10');
  });

  // Danceability Convert To Value tests minimum
  it('should output value data for danceability (good input minimum)', () => {
    // Arrange
    const metric = 'danceability';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('0/10');
  });

  // Danceability Get Display Title
  it('should change the title to danceability (good input max/min)', () => {
    // Arrange
    const metric = 'danceability';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Danceability Rating');
  });

  // ========================
  //      Duration
  // ========================
  // Duration Get Average tests Maximum
  it('should calculate the average duration (good data maximum)', () => {
    // Arrange
    const metric = 'duration_ms';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBe(376000);
  });

  // Duration Get Average tests Minimum
  it('should calculate the average duration (good data minimum)', () => {
    // Arrange
    const metric = 'duration_ms';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBe(6000);
  });

  // Duration Get Average tests Boundary
  it('should calculate the average duration (good data boundary)', () => {
    // Arrange
    const metric = 'duration_ms';
    
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);

    // Assert
    expect(component.average).toBe(66000);
  });

  // Duration Convert To Value tests maximum
  it('should output value data for duration (good input maximum)', () => {
    // Arrange
    const metric = 'duration_ms';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('6:16');
  });

  // Duration Convert To Value tests minimum
  it('should output value data for duration (good input minimum)', () => {
    // Arrange
    const metric = 'duration_ms';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('0:06');
  });

  // Duration Convert To Value tests boundary
  it('should output value data for duration (good input boundary)', () => {
    // Arrange
    const metric = 'duration_ms';
      
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);
  
    // Assert
    expect(component.compositeScore).toBe('1:06');
  });

  // Duration Get Display Title
  it('should change the title to duration (good input max/min/boundary)', () => {
    // Arrange
    const metric = 'duration_ms';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Average Song Length');
  });

  // ========================
  //      Energy
  // ========================
  // Energy Get Average tests Maximum
  it('should calculate the average energy (good data maximum)', () => {
    // Arrange
    const metric = 'energy';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.995);
  });
  
  // Energy Get Average tests Minimum
  it('should calculate the average energy (good data minimum)', () => {
    // Arrange
    const metric = 'energy';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.001);
  });

  // Energy Convert To Value tests maximum
  it('should output value data for energy (good input maximum)', () => {
    // Arrange
    const metric = 'energy';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('100%');
  });

  // Energy Convert To Value tests minimum
  it('should output value data for energy (good input minimum)', () => {
    // Arrange
    const metric = 'energy';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('0%');
  });

  // Energy Get Display Title
  it('should change the title to energy (good input max/min)', () => {
    // Arrange
    const metric = 'energy';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Percent Energetic');
  });

  // ========================
  //      Instrumentalness
  // ========================
  // Instrumentalness Get Average tests Maximum
  it('should calculate the average instrumentalness (good data maximum)', () => {
    // Arrange
    const metric = 'instrumentalness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(1);
  });
  
  // Instrumentalness Get Average tests Minimum
  it('should calculate the average instrumentalness (good data minimum)', () => {
    // Arrange
    const metric = 'instrumentalness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBeCloseTo(0);
  });
  
  // Instrumentalness Get Average tests Boundary
  it('should calculate the average instrumentalness (good data boundary)', () => {
    // Arrange
    const metric = 'instrumentalness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);

    // Assert
    expect(component.average).toBeCloseTo(1);
  });

  // Instrumentalness Convert To Value tests maximum
  it('should output value data for instrumentalness (good input maximum)', () => {
    // Arrange
    const metric = 'instrumentalness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('100%');
  });

  // Instrumentalness Convert To Value tests minimum
  it('should output value data for instrumentalness (good input minimum)', () => {
    // Arrange
    const metric = 'instrumentalness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('0%');
  });

  // Instrumentalness Convert To Value tests Boundary
  it('should output value data for instrumentalness (good input boundary)', () => {
    // Arrange
    const metric = 'instrumentalness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);
  
    // Assert
    expect(component.compositeScore).toBe('100%');
  });

  // Instrumentalness Get Display Title
  it('should change the title to instrumentalness (good input max/min/boundary)', () => {
    // Arrange
    const metric = 'instrumentalness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Percent of Tracks that are Instrumental');
  });

  // ========================
  //      Liveness
  // ========================
  // Liveness Get Average tests Maximum
  it('should calculate the average liveness (good data maximum)', () => {
    // Arrange
    const metric = 'liveness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(1);
  });
  
  // Liveness Get Average tests Minimum
  it('should calculate the average liveness (good data minimum)', () => {
    // Arrange
    const metric = 'liveness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBeCloseTo(0);
  });
  
  // Liveness Get Average tests Boundary
  it('should calculate the average liveness (good data boundary)', () => {
    // Arrange
    const metric = 'liveness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);

    // Assert
    expect(component.average).toBeCloseTo(1);
  });

  // Liveness Convert To Value tests maximum
  it('should output value data for liveness (good input maximum)', () => {
    // Arrange
    const metric = 'liveness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('100%');
  });

  // Liveness Convert To Value tests minimum
  it('should output value data for liveness (good input minimum)', () => {
    // Arrange
    const metric = 'liveness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('0%');
  });

  // Liveness Convert To Value tests Boundary
  it('should output value data for liveness (good input boundary)', () => {
    // Arrange
    const metric = 'liveness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);
  
    // Assert
    expect(component.compositeScore).toBe('100%');
  });

  // Liveness Get Display Title
  it('should change the title to liveness (good input max/min/boundary)', () => {
    // Arrange
    const metric = 'liveness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Percent of Tracks Performed Live');
  });

  // ========================
  //      Mode
  // ========================
  // Mode Get Average tests Maximum
  it('should calculate the average mode (good data maximum)', () => {
    // Arrange
    const metric = 'mode';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(1);
  });
  
  // Mode Get Average tests Minimum
  it('should calculate the average mode (good data minimum)', () => {
    // Arrange
    const metric = 'mode';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.50);
  });
  
  // Mode Get Average tests Boundary
  it('should calculate the average mode (good data boundary)', () => {
    // Arrange
    const metric = 'mode';
    
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.51);
  });

  // Mode Convert To Value tests maximum
  it('should output value data for mode (good input maximum)', () => {
    // Arrange
    const metric = 'mode';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('Major key');
  });

  // Mode Convert To Value tests minimum
  it('should output value data for mode (good input minimum)', () => {
    // Arrange
    const metric = 'mode';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('Minor key');
  });

  // Mode Convert To Value tests Boundary
  it('should output value data for mode (good input boundary)', () => {
    // Arrange
    const metric = 'mode';
      
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);
  
    // Assert
    expect(component.compositeScore).toBe('Major key');
  });

  // Mode Get Display Title
  it('should change the title to mode (good input max/min/boundary)', () => {
    // Arrange
    const metric = 'mode';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('The Majority of Your Songs Are');
  });

  // ========================
  //      Speechiness
  // ========================
  // Speechiness Get Average tests Maximum
  it('should calculate the average speechiness (good data maximum)', () => {
    // Arrange
    const metric = 'speechiness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.67);
  });
  
  // Speechiness Get Average tests Minimum
  it('should calculate the average speechiness (good data minimum)', () => {
    // Arrange
    const metric = 'speechiness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.33);
  });
  
  // Speechiness Get Average tests Boundary
  it('should calculate the average speechiness (good data boundary)', () => {
    // Arrange
    const metric = 'speechiness';
    
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.66);
  });

  // Speechiness Convert To Value tests maximum
  it('should output value data for speechiness (good input maximum)', () => {
    // Arrange
    const metric = 'speechiness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('Spoken Word');
  });

  // Speechiness Convert To Value tests minimum
  it('should output value data for speechiness (good input minimum)', () => {
    // Arrange
    const metric = 'speechiness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('Musical Tracks');
  });

  // Speechiness Convert To Value tests Boundary
  it('should output value data for speechiness (good input boundary)', () => {
    // Arrange
    const metric = 'speechiness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);
  
    // Assert
    expect(component.compositeScore).toBe('Rhythmic Spoken Word');
  });

  // Speechiness Get Display Title
  it('should change the title to speechiness (good input max/min/boundary)', () => {
    // Arrange
    const metric = 'speechiness';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('On Average, Tracks in this Playlist Contain');
  });

  // ========================
  //      Tempo
  // ========================
  // Tempo Get Average tests Maximum
  it('should calculate the average tempo (good data maximum)', () => {
    // Arrange
    const metric = 'tempo';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(185);
  });

  // Tempo Convert To Value tests maximum
  it('should output value data for tempo (good input maximum)', () => {
    // Arrange
    const metric = 'tempo';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('185 bpm');
  });

  // Tempo Get Display Title
  it('should change the title to tempo (good input max)', () => {
    // Arrange
    const metric = 'tempo';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Average Song Tempo');
  });

  // ========================
  //      Time signature
  // ========================
  // Time signature Get Average tests Maximum
  it('should calculate the average time_signature (good data maximum)', () => {
    // Arrange
    const metric = 'time_signature';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(4);
  });

  // Time signature Get Average tests minimum
  it('should output value data for time_signature (good input minimum)', () => {
    // Arrange
    const metric = 'time_signature';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBeCloseTo(4);
  });

  // Time signature Convert To Value tests maximum
  it('should output value data for time_signature (good input maximum)', () => {
    // Arrange
    const metric = 'time_signature';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('4');
  });

  // Time signature Convert To Value tests minimum
  it('should output value data for time_signature (good input minimum)', () => {
    // Arrange
    const metric = 'time_signature';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('4');
  });

  // Time signature Get Display Title
  it('should change the title to time_signature (good input max/min)', () => {
    // Arrange
    const metric = 'time_signature';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Average Beats per Bar');
  });

  // ========================
  //      Valence
  // ========================
  // Valence Get Average tests Maximum
  it('should calculate the average valence (good data maximum)', () => {
    // Arrange
    const metric = 'valence';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.average).toBeCloseTo(1);
  });
  
  // Valence Get Average tests Minimum
  it('should calculate the average valence (good data minimum)', () => {
    // Arrange
    const metric = 'valence';
    
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.50);
  });
  
  // Valence Get Average tests Boundary
  it('should calculate the average valence (good data boundary)', () => {
    // Arrange
    const metric = 'valence';
    
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);

    // Assert
    expect(component.average).toBeCloseTo(0.51);
  });

  // Valence Convert To Value tests maximum
  it('should output value data for valence (good input maximum)', () => {
    // Arrange
    const metric = 'valence';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);
  
    // Assert
    expect(component.compositeScore).toBe('These Songs Spark Joy');
  });

  // Valence Convert To Value tests minimum
  it('should output value data for valence (good input minimum)', () => {
    // Arrange
    const metric = 'valence';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMin, metric);
  
    // Assert
    expect(component.compositeScore).toBe('These Songs Do Not Spark Joy');
  });

  // Valence Convert To Value tests Boundary
  it('should output value data for valence (good input boundary)', () => {
    // Arrange
    const metric = 'valence';
      
    // Act
    component.CalculateCompositeScore(rawMetricsBoundary, metric);
  
    // Assert
    expect(component.compositeScore).toBe('These Songs Spark Joy');
  });

  // Valence Get Display Title
  it('should change the title to valence (good input max/min/boundary)', () => {
    // Arrange
    const metric = 'valence';
      
    // Act
    component.CalculateCompositeScore(rawMetricsMax, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe('Valence');
  });
});
