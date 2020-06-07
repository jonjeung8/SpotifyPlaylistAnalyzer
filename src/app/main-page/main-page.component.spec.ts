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

  //======================
  // Test ID parsing 
  //======================
  
  //linkSubmitStr is an empty string
  it('should return an empty string', () => {
    let res: string = component.parseID('');
    expect(res).toBe('');
  })

  //linkSubmitStr is shorter than a valid Spotify playlist ID
  it('should return the original input string', () => {
    let res: string = component.parseID('playlist');
    expect(res).toBe('playlist');
  })

  //linkSubmitStr is the exact length of a valid Spotify playlist ID
  it('should return the original input string', () => {
    let inputString: string = '0123456789abcdefghijkl';
    let res: string = component.parseID(inputString);
    expect(res).toEqual(inputString);
  })

  //linkSubmitStr is longer than a valid Spotify playlist ID and doesn't contain 'playlist'
  it('should return the original input string', () => {
    let inputString: string = '0123456789abcdefghijklm';
    let res: string = component.parseID(inputString);
    expect(res).toEqual(inputString);
  })

  //linkSubmitStr is a Spotify playlist URI
  it('should return 22 char Spotify playlist id', () => {
    let inputString: string = 'spotify:playlist:7sHhUQShU4yDN53LqPGa2F';
    let res: string = component.parseID(inputString);
    expect(res).toBe('7sHhUQShU4yDN53LqPGa2F');
  })

  //linkSubmitStr is a Spotify playlist URL
  it('should return 22 char Spotify playlist id', () => {
    let inputString: string = 'https://open.spotify.com/playlist/7sHhUQShU4yDN53LqPGa2F?si=ZzRwLW_MQYGTi1VJoJfCow';
    let res: string = component.parseID(inputString);
    expect(res).toBe('7sHhUQShU4yDN53LqPGa2F');
  })

  //Remaining chars in linkSubmitStr after 'playlist:' are fewer than a valid Spotify playlist ID
  it('should return a string with less than 22 chars', () => {
    let URI: string = 'spotify:playlist:7sHhUQShU4yDN53LqPGa2F';
    let inputString: string = URI.slice(0, (URI.length - 1));
    let res: string = component.parseID(inputString);
    expect(res).toBe('7sHhUQShU4yDN53LqPGa2');
  })

  //Properly formulates link strings
  it('should format the widget submit string after the link submit string', () => {
    component.linkSubmitStr = 'spotify:playlist:7sHhUQShU4yDN53LqPGa2F';
    component.FormulateLinkStrings();
    const expectedWidgetStr = `https://open.spotify.com/embed/playlist/${component.linkSubmitStr}`;
    expect(component.widgetSubmitStr).toBe(expectedWidgetStr);
  })
});
