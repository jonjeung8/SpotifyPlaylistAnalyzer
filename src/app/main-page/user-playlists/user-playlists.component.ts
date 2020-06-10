import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaylistNode } from 'src/app/_models/PlaylistNode';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {
  @Input() userPlaylists: Array<PlaylistNode>;

  @Output() onPlaylistSelected = new EventEmitter<string>();
  @Output() onNextPlaylistsButtonClick = new EventEmitter<any>();
  @Output() onPrevPlaylistsButtonClick = new EventEmitter<any>();

  playlistButtonPressed(playlistID: string)
  {
    this.onPlaylistSelected.emit(playlistID);
  }

  constructor() { }

  ngOnInit(): void {
  }

  NextPlaylistsButton()
  {
    this.onNextPlaylistsButtonClick.emit();
  }

  PrevPlaylistsButton()
  {
    this.onPrevPlaylistsButtonClick.emit();
  }
}
