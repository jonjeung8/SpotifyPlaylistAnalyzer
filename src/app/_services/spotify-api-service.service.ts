import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiServiceService {

  constructor(
    private http: HttpClient
  ) { }

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
    let url = "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)))&limit=20&offset=5";

    //====================
    // Headers:
    //====================
    let httpOptions = { headers :new HttpHeaders({"Content-Type": "application/json", "Accept":"application/json", "Authorization": "Bearer " + bearerToken}) };
    console.log("Making api call");

    //====================
    // Actual API call:
    //====================
    return this.http.get<any>(url, httpOptions)
    .pipe(
      map (
        response => {
          return response;
        }
      )
    );
  }

  LoginRedirect()
  {
    //===================
    // client id:
    //===================
    var client_id = environment.client_id_key 

    //===================
    // redirect uri:
    //===================
    var redirect_uri = 'http://localhost:4200/'
    
    //===================
    // scope:
    //===================
    var scope = 'user-read-private%20user-read-email';
    
    //===================
    // state:
    //===================
    var state = 123;


    //===================
    // url:
    //===================
    var url = 'https://accounts.spotify.com/authorize';
    url += '?client_id=' + client_id;
    url += '&redirect_uri=' + redirect_uri;
    url += '&scope=' + scope;
    url += '&response_type=token';
    url += '&state=' + state;
    
    //====================
    // Actual API call:
    //====================
    return this.http.get<any>(url)
    .pipe(
      map (
        response => {
          return response;
        }
      )
    );
  }

}
