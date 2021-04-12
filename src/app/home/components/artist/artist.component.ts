import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  @Input() artists: Artist[];

  constructor() { }

  ngOnInit(): void {
  }

}
