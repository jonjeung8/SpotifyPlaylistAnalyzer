import { Component, OnInit, Input } from '@angular/core';
import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';
import { Playlist } from '../_models/Playlist';
import { Track } from '../_models/Track';
import { Album } from '../_models/album';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  linkSubmitStr : string;
  bearerTokenStr: string;

  apiResponse: string;

  userPlaylist: Playlist;

  constructor(private spotifyApi: SpotifyApiServiceService) { 

    this.linkSubmitStr = "";
    this.userPlaylist = new Playlist();
    this.userPlaylist.tracks = new Array<Track>();
  }


  ngOnInit(): void {
  }

  AnalysisButtonClicked()
  {

    console.log("Calling to spotify api service");

    this.spotifyApi.GetPlaylistResults(this.linkSubmitStr, this.bearerTokenStr)
    .subscribe(
      response => {
        this.apiResponse = JSON.stringify(response);
        console.log("Api call recieved");

        if(response.items)
        {
        
          this.userPlaylist.tracks = new Array<Track>();

          for(let item of response.items)
          {
            // Get the album data, get the track data
            let tmpTrack = new Track();
            tmpTrack.href = item.track.href;
            tmpTrack.name = item.track.name;
            console.log(item.track.name);
            if(item.track.album)
            {
              let tmpAlbum = new Album();
              tmpAlbum.href = item.track.album.href;
              tmpAlbum.name = item.track.album.name;

              tmpTrack.album = tmpAlbum;
            }
            
            this.userPlaylist.tracks.push(tmpTrack);
            
          }
        }

      }
    )

  }

}