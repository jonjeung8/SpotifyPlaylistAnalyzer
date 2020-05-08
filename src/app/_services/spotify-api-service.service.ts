import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiServiceService {

  httpOptions: Object;

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = "";
   }

  GetPlaylistResults(playlist_id:string, bearerToken: string)
  {
    // REFERENCE:
    // https://api.spotify.com/v1/playlists/37i9dQZF1DWXRqgorJj26U/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)))&limit=20&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer

    /*
     * 
     *
     * Messy messy.. but I'm just trying to get something working.
     * 
     * 
     */
    
    //===================
    // url:
    //===================
    let url = "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)%2Cid))&limit=20&offset=0";

    //====================
    // Headers:
    //====================
    this.httpOptions = { headers :new HttpHeaders({"Content-Type": "application/json", "Accept":"application/json", "Authorization": "Bearer " + bearerToken}) };
    console.log("Making api call");

    //====================
    // Actual API call:
    //====================
    return this.http.get<any>(url, this.httpOptions)
    .pipe(
      map (
        response => {
          return response;
        }
      )
    );
  }

  GetFeatures(track_id:string)
  {
    // REFERENCE:
    // https://api.spotify.com/v1/playlists/37i9dQZF1DWXRqgorJj26U/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)))&limit=20&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer

    /*
     * 
     *
     * Messy messy.. but I'm just trying to get something working.
     * 
     * 
     */
    
    //===================
    // url:
    //===================

    let url = "https://api.spotify.com/v1/audio-features?ids=" + track_id;

    //====================
    // Headers:
    //====================
    let httpOptions = { headers :new HttpHeaders({"Content-Type": "application/json", "Accept":"application/json"}) };
    console.log("GET MY FEATURES");

    //====================
    // Actual API call:
    //====================
    return this.http.get<any>(url, this.httpOptions)
    .pipe(
      map (
        response => {
          return response;
        }
      )
    );
  }

}
