import { Component, OnInit, Input, Output } from '@angular/core';
import { PlaylistNode } from 'src/app/_models/PlaylistNode';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {
  @Input() userPlaylists: Array<PlaylistNode>;

  constructor() { }

  ngOnInit(): void {
  }

}
