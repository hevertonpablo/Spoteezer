import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
 @Input() albums: Album[]
  constructor() { }

  ngOnInit(): void {
  }

}
