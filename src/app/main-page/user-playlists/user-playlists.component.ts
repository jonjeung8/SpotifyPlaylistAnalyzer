import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaylistNode } from 'src/app/_models/PlaylistNode';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {
  @Input() userPlaylists: Array<PlaylistNode>;

  @Output() onPlaylistSelected = new EventEmitter<String>();

  playlistButtonPressed(playlistID: string)
  {
    this.onPlaylistSelected.emit(playlistID);
    console.log("playlist was selected from loaded playlists.");
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
