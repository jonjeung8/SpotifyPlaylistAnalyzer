import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpotifyApiServiceService {
  httpOptions: Object;
  private bearToken: string;

  constructor(private http: HttpClient)
  {
    this.httpOptions = '';
  }

  SetBearerToken(token: string)
  {
    this.bearToken = token;
  }

  getQuery(query: string)
  {
    const url = `https://api.spotify.com/v1/${query}`;

    // headers
    const headers = new HttpHeaders({
      Authorization:
        `Bearer ${this.bearToken}`
    });

    // api call
    return this.http.get(url, { headers }).pipe(
      map(response => response),
      catchError(this.handle404)
    );
  }

  handle404(error)
  {
    return EMPTY;
  }


  GetPlaylistResults(playlist_id: string, bearerToken: string)
  {
    this.bearToken = `${bearerToken}`;
    const playlistResultsString = `playlists/${playlist_id}/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)%2Cid))&limit=100&offset=0`;
    return this.getQuery(playlistResultsString);
  }

  GetFeatures(track_id: string)
  {
    // grab track_id string url
    const tracksIdString = `audio-features?ids=${track_id}`;
    return this.getQuery(tracksIdString);
  }

  LoginRedirect(): string
  {
    // ===================
    // client id:
    // ===================
    const client_id = environment.client_id_key;
    // ===================
    // redirect uri:
    // ===================
    const redirect_uri = environment.redirect_uri;
    // ===================
    // scope:
    // ===================
    const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';
    // ===================
    // state:
    // ===================
    const state = 123;
    // ===================
    // url:
    // ===================
    let url = 'https://accounts.spotify.com/authorize';
    url += '?client_id=' + encodeURIComponent(client_id);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&response_type=token';
    url += '&state=' + encodeURIComponent(state);

    return url;
  }

  GetUserPlaylists(offset: number)
  {
    const totalOffset = offset * 20;
    const apiEndpoint = `me/playlists?offset=${totalOffset}&limit=20`;
    return this.getQuery(apiEndpoint);
  }
}
