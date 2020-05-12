import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        "Bearer BQDfhmx5C26j9TXkaIF8Lb8lsAvEuZgshGRdE2xZ95-ydpWYBO0T2T64O3Cwgp_z3qlQ6plw9CYPooIjeguf18svwzTkxmDDrFBsRcmJDZWEN_04vty77tQnl8g4l7ggHM2TVaywSjSMLS-h1Ya7NgVBzQtMZuU"
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
}
