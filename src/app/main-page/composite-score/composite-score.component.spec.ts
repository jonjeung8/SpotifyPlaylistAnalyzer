import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeScoreComponent } from './composite-score.component';

describe('CompositeScoreComponent', () => {
  let component: CompositeScoreComponent;
  let fixture: ComponentFixture<CompositeScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
