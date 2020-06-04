import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';
import { Playlist } from '../_models/Playlist';
import { Track } from '../_models/Track';
import { Album } from '../_models/album';
import { RawMetrics } from '../_models/RawMetrics';
import { Category } from '../_models/category';

import { Callback } from '../_models/logincallback';
import { SafePipe } from '../safe.pipe';
// components
import { CategorySelectorComponent } from '../main-page/category-selector/category-selector.component';
import { CompositeScoreComponent } from '../main-page/composite-score/composite-score.component';
import { OutliersComponent } from './outliers/outliers.component';
import { PlaylistNode } from '../_models/PlaylistNode';
import { UserPlaylistsComponent } from '../main-page/user-playlists/user-playlists.component';

export const CATEGORIES: Array<Category> = Array(
  new Category('Danceability', 'danceability'),
  new Category('Energy', 'energy'),
  // new Category("Key", "key"),
  // new Category("Loudness","loudness"),
  new Category('Mode', 'mode'),
  new Category('Speechiness', 'speechiness'),
  new Category('Acousticness', 'acousticness'),
  new Category('Instrumentalness', 'instrumentalness'),
  new Category('Liveness', 'liveness'),
  new Category('Valence', 'valence'),
  new Category('Tempo', 'tempo'),
  new Category('Time Signature', 'time_signature'),
  new Category('Duration', 'duration_ms')
);


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  linkSubmitStr: string; // link of the playlist
  widgetSubmitStr: string; // link created for the widget
  trackIDArray: string; // stringified array of track ids in playlist
  hidden: boolean; // determines when to reveal the response
  userPlaylist: Playlist; // to store the playlist
  categories: Array<Category> = CATEGORIES;
  hideOutliers = true;
  allPlaylists: Array<PlaylistNode>;
  hideAllPlaylists: boolean;
  hideInnerAllPlaylists: boolean;

  //@ViewChild('appCategorySelector') appCategorySelector: CategorySelectorComponent;
  @ViewChild('appCompositeScore') appCompositeScore: CompositeScoreComponent;
  @ViewChild('outlierList') outlierList: OutliersComponent;
  @ViewChild('appUserPlaylists') appUserPlaylists: UserPlaylistsComponent;
  @ViewChild('appInnerUserPlaylists') appInnerUserPlaylists: UserPlaylistsComponent;

  loginCallback: Callback;

  constructor(
    private spotifyApi: SpotifyApiServiceService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.linkSubmitStr = '';
    this.widgetSubmitStr = '';
    this.trackIDArray = '';
    this.userPlaylist = new Playlist();
    this.userPlaylist.tracks = new Array<Track>();
    this.hidden = true;
    this.userPlaylist.metrics = new Array<RawMetrics>();
    this.allPlaylists = new Array<PlaylistNode>();
    this.hideAllPlaylists = true;
    this.hideInnerAllPlaylists = true;
  }

  ngOnInit(): void {
  console.log(this.router.url);

  console.log(this.route.snapshot.fragment); // only update on component creation
  this.route.fragment.subscribe(
    fragment => {
      // Convert to Url search params:
      const params = new URLSearchParams('?' + fragment);

      // console.log(params);

      if (params.has('access_token') && params.has('expires_in') && params.has('state') )
      {
        this.loginCallback = new Callback();

        const tmpAccessToken = params.get('access_token');
        const tmpExpiresIn = params.get('expires_in');
        const tmpState = params.get('state');

        if (tmpAccessToken !== '' && tmpExpiresIn !== '' && tmpState !== '')
        {
          this.loginCallback.access_token = tmpAccessToken;
          this.loginCallback.expires_in = Number(tmpExpiresIn);
          this.loginCallback.state = tmpState;

          // Supply the API service with the bearer token:
          this.spotifyApi.SetBearerToken(this.loginCallback.access_token);

          // API call to get the user playlists
          this.GetAllUserPlaylists();

        }
        else{
          console.log('login failed 1');
          this.router.navigate(['']);
          console.log('login failed 2');
        }
      }
      else {
        console.log('login failed 3');
        this.router.navigate(['']);
        console.log('login failed 4');
      }



    }
  );
  }
  ShowPlaylistElements()
  {
    this.hidden = false;
  }

  AnalysisButtonClicked()
  {
    // Reset the data containers:
    this.userPlaylist.tracks = new Array<Track>();
    this.userPlaylist.metrics = new Array<RawMetrics>();
    this.trackIDArray = '';
    this.hideOutliers = true;
    this.hideAllPlaylists = true;
    this.hideInnerAllPlaylists = true;
    this.appCompositeScore.hideMetrics = true;


    this.linkSubmitStr = this.parseID(this.linkSubmitStr);

    this.widgetSubmitStr = `https://open.spotify.com/embed/playlist/${this.linkSubmitStr}`;

    console.log('Calling to spotify api service');



    this.spotifyApi.GetPlaylistResults(this.linkSubmitStr, this.loginCallback.access_token)
    .subscribe({
      next: (response: any) => {
        console.log('I MADE IT TO the get playlist api response');
        console.log('Api call recieved for first');

        if (response.items)
        {

          for (const item of response.items)
          {
            // Get the album data, get the track data
            const tmpTrack = new Track();
            tmpTrack.href = item.track.href;
            tmpTrack.name = item.track.name;
            tmpTrack.id = item.track.id;
            this.trackIDArray += tmpTrack.id + '%2C';
            if (item.track.album)
            {
              const tmpAlbum = new Album();
              tmpAlbum.href = item.track.album.href;
              tmpAlbum.name = item.track.album.name;
              tmpTrack.album = tmpAlbum;
            }
            this.userPlaylist.tracks.push(tmpTrack);
          }
          // this.ShowPlaylistElements();
        }
      },
      complete: () =>
      {
        this.spotifyApi.GetFeatures(this.trackIDArray)
        .subscribe({
          next: (response: any) => {
            console.log('I MADE IT TO the get features response');
            console.log('Api call recieved for second');

            if (response.audio_features)
            {
              console.log(response.audio_features);
              for (const item of response.audio_features)
              {
                const tmpMetrics = new RawMetrics();
                tmpMetrics.acousticness = item.acousticness;
                tmpMetrics.danceability = item.danceability;
                tmpMetrics.duration_ms = item.duration_ms;
                tmpMetrics.energy = item.energy;
                tmpMetrics.id = item.id;
                tmpMetrics.instrumentalness = item.instrumentalness;
                tmpMetrics.key = item.key;
                tmpMetrics.liveness = item.liveness;
                tmpMetrics.loudness = item.loudness;
                tmpMetrics.mode = item.mode;
                tmpMetrics.speechiness = item.speechiness;
                tmpMetrics.tempo = item.tempo;
                tmpMetrics.time_signature = item.time_signature;
                tmpMetrics.valence = item.valence;
                this.userPlaylist.metrics.push(tmpMetrics);
              }
            }
            // this.JoinMetricToTracks(tmpMetrics, this.userPlaylist.metrics);
          },
          complete: () =>
          {
            // console.log(`hey, the category is verified: ${this.appCategorySelector.validateCategory()}`);
            // this.appCompositeScore.CalculateCompositeScore(this.userPlaylist.metrics, this.appCategorySelector.category);
            this.appCompositeScore.CalculateAllMetrics(this.userPlaylist.metrics);
            this.ShowPlaylistElements();

            // Find and display outliers on the screen:
            // this.outlierList.getOutliers(
            //   this.userPlaylist,
            //   this.appCompositeScore.synergyAverage,
            //   this.appCategorySelector.category
            // );

              this.appCompositeScore.hideMetrics = false;
              this.appCompositeScore.setPlaylistToggleString();
          }
        });
      }
    });
  }

  parseID(linkSubmitStr: string): string {
    let idParsed = '';

    if (linkSubmitStr.length > 22) {
      const playlistPosition: number = linkSubmitStr.toLowerCase().search('playlist');
      if (playlistPosition > -1) {
        const idPosition: number = playlistPosition + 9;
        idParsed = linkSubmitStr.slice(idPosition, idPosition + 22);
        return idParsed;
      }
    }
    return linkSubmitStr;
  }

  outliersButtonClicked(metric: string) 
  {
    //this.hideOutliers = !clicked;
    this.hideInnerAllPlaylists = true;
    this.outlierList.getOutliers(this.userPlaylist, 1, metric);
    this.hideOutliers = false;
    this.appCompositeScore.setPlaylistToggleString();
    
  }

  metricsButtonClicked(clicked: boolean) 
  {
    this.hideOutliers = true;
    this.hideInnerAllPlaylists = true;
    this.appCompositeScore.hideMetrics = false;
    this.appCompositeScore.setPlaylistToggleString();

  }

  OnInnerPlaylistClicked(clicked: boolean)
  {
    console.log("Clicked state: " + clicked);
    this.hideOutliers = true;
    this.hideInnerAllPlaylists = !clicked;
  }


  GetAllUserPlaylists()
  {
    this.hideAllPlaylists = true;
    this.allPlaylists = new Array<PlaylistNode>();

    // Make API call:
    this.spotifyApi.GetUserPlaylists()
    .subscribe({
      next: (response: any) =>
      {
        console.log('Got all user playlists returned');
        // Parse the response:
        if (response.items)
        {
          // Iterate Playlist objects:
          for (const item of response.items)
          {
            const node: PlaylistNode = new PlaylistNode();
            node.id = item.id;
            node.name = item.name;

            this.allPlaylists.push(node);
          }
        }

      },
      complete: () =>
      {
        this.hideAllPlaylists = false;
        console.log(this.allPlaylists);
      }
    });
  }

  OnPlaylistClicked(playlistID: string)
  {
    this.linkSubmitStr = playlistID;
  }

}
