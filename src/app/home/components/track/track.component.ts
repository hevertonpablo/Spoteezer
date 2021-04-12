import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
 @Input() tracks: Track[]
  constructor() { }

  ngOnInit(): void {
  }

}
