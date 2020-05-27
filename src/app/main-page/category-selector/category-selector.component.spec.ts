import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectorComponent } from './category-selector.component';

describe('CategorySelectorComponent', () => {
  let component: CategorySelectorComponent;
  let fixture: ComponentFixture<CategorySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*// Metric Selection Tests for null/bad data
  it('should calculate the average acousticness (bad data input)', () => {
    // Arrange
    component.category = 'key';
    var booleanCategory = component.validateCategory();

    // Act

    // Assert
    expect(component.average).toBe(0);
  });

  it('should calculate the average acousticness (null data input)', () => {
    // Arrange
    const metric = '0';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.average).toBe(0);
  }); //*/
});
