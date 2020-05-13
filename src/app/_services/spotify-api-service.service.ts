import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpotifyApiServiceService {

  httpOptions: Object;
  private bearToken: string;

  constructor(private http: HttpClient) 
  {
    this.httpOptions = "";
  }


  getQuery(query: string)
  {
    const url = `https://api.spotify.com/v1/${query}`;

    //headers
    const headers = new HttpHeaders({
      "Authorization":
        `Bearer ${bearToken}`
    });

    //api call
    console.log("Making api call");
    return this.http.get(url, { headers }).pipe(
      map(response => response)
    );
  }


  GetPlaylistResults(playlist_id:string, bearerToken: string)
  {
    console.log("GET PLAYLIST RESULTS API CALL");
    this.bearToken = `${bearerToken}`;
    let playlistResultsString = `playlists/${playlist_id}/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)%2Cid))&limit=100&offset=0`;
    return this.getQuery(playlistResultsString)
  }

  GetFeatures(track_id:string)
  {
    console.log("GET MY FEATURES API CALL");
    //grab track_id string url
    let tracksIdString = `audio-features?ids=${track_id}`;
    return this.getQuery(tracksIdString);
  }

  LoginRedirect(): string
  {
    //===================
    // client id:
    //===================
    var client_id = environment.client_id_key 

    //===================
    // redirect uri:
    //===================
    //var redirect_uri = 'http:%2F%2Flocalhost%3A4200%2F'
    var redirect_uri = 'http://localhost:4200/callback';
    //===================
    // scope:
    //===================
    //var scope = 'user-read-private%20user-read-email';
    var scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative';
    //===================
    // state:
    //===================
    var state = 123;


    //===================
    // url:
    //===================
    var url = 'https://accounts.spotify.com/authorize';
    url += '?client_id=' + encodeURIComponent(client_id);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&response_type=token';
    url += '&state=' + encodeURIComponent(state);
    
    //==================
    // Header:
    //==================
    //let httpOptions = { headers :new HttpHeaders({"Content-Type": "application/json", "Accept":"application/json"}) };


    //====================
    // Actual API call:
    //====================
    /*return this.http.get<any>(url, httpOptions)
    .pipe(
      map (
        response => {
          return response;
        }
      )
    );*/

    return url;

  }

}
