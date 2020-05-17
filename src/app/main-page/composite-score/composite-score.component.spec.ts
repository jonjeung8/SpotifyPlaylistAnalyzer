import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeScoreComponent } from './composite-score.component';
import { Category } from '../../_models/category';
import { RawMetrics } from 'src/app/_models/RawMetrics';

describe('CompositeScoreComponent', () => {
  let component: CompositeScoreComponent;
  let fixture: ComponentFixture<CompositeScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeScoreComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeScoreComponent);
    component = fixture.componentInstance;

    var rawMetrics = new Array<RawMetrics>();
    
    for(let i = 0; i < 10; i++)
    {
      let tmpMetrics = new RawMetrics();
      tmpMetrics.acousticness = 1;
      tmpMetrics.danceability = 2;
      tmpMetrics.duration_ms = 3;
      tmpMetrics.energy = 4;
      tmpMetrics.instrumentalness = 5;
      tmpMetrics.liveness = 6;
      tmpMetrics.mode = 7;
      tmpMetrics.speechiness = 8;
      tmpMetrics.tempo = 9;
      tmpMetrics.time_signature = 10;
      tmpMetrics.valence = 11;
      this.userPlaylist.metrics.push(tmpMetrics); 
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the right average', () => {
    // ========
    // Arrange
    // ========
    // Array of metrics
   

    // loop
    

    // Catergory select string
    
    
    // ========
    // Act
    // ========


    // ========
    // Assert
    // ========
    expect(component).toBeTruthy();
  });
});
