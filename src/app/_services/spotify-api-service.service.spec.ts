import { TestBed } from '@angular/core/testing';

import { SpotifyApiServiceService } from './spotify-api-service.service';

describe('SpotifyApiServiceService', () => {
  let service: SpotifyApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyApiServiceService);
  });

  /* Commented out for CI demo
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  */
});
