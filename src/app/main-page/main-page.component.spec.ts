import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule } from '@angular/router/testing';
import { SafePipe } from '../safe.pipe';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        MainPageComponent,
        SafePipe
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // * Commented out for CI demo
  // */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // */

  // ======================
  // Test ID parsing
  // ======================

  // linkSubmitStr is an empty string
  it('should return an empty string', () => {
    const res: string = component.parseID('');
    expect(res).toBe('');
  });

  // linkSubmitStr is shorter than a valid Spotify playlist ID
  it('should return the original input string', () => {
    const res: string = component.parseID('playlist');
    expect(res).toBe('playlist');
  });

  // linkSubmitStr is the exact length of a valid Spotify playlist ID
  it('should return the original input string', () => {
    const inputString = '0123456789abcdefghijkl';
    const res: string = component.parseID(inputString);
    expect(res).toEqual(inputString);
  });

  // linkSubmitStr is longer than a valid Spotify playlist ID and doesn't contain 'playlist'
  it('should return the original input string', () => {
    const inputString = '0123456789abcdefghijklm';
    const res: string = component.parseID(inputString);
    expect(res).toEqual(inputString);
  });

  // linkSubmitStr is a Spotify playlist URI
  it('should return 22 char Spotify playlist id', () => {
    const inputString = 'spotify:playlist:7sHhUQShU4yDN53LqPGa2F';
    const res: string = component.parseID(inputString);
    expect(res).toBe('7sHhUQShU4yDN53LqPGa2F');
  });

  // linkSubmitStr is a Spotify playlist URL
  it('should return 22 char Spotify playlist id', () => {
    const inputString = 'https://open.spotify.com/playlist/7sHhUQShU4yDN53LqPGa2F?si=ZzRwLW_MQYGTi1VJoJfCow';
    const res: string = component.parseID(inputString);
    expect(res).toBe('7sHhUQShU4yDN53LqPGa2F');
  });

  // Remaining chars in linkSubmitStr after 'playlist:' are fewer than a valid Spotify playlist ID
  it('should return a string with less than 22 chars', () => {
    const URI = 'spotify:playlist:7sHhUQShU4yDN53LqPGa2F';
    const inputString: string = URI.slice(0, (URI.length - 1));
    const res: string = component.parseID(inputString);
    expect(res).toBe('7sHhUQShU4yDN53LqPGa2');
  });

  // Properly formulates link strings
  it('should format the widget submit string after the link submit string', () => {
    component.linkSubmitStr = 'spotify:playlist:7sHhUQShU4yDN53LqPGa2F';
    component.FormulateLinkStrings();
    const expectedWidgetStr = `https://open.spotify.com/embed/playlist/${component.linkSubmitStr}`;
    expect(component.widgetSubmitStr).toBe(expectedWidgetStr);
  });
});
