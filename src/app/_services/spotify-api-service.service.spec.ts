import { TestBed } from '@angular/core/testing';

import { SpotifyApiServiceService } from './spotify-api-service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SpotifyApiServiceService', () => {
  let service: SpotifyApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(SpotifyApiServiceService);
  });

  //* Commented out for CI demo
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //*/
});
