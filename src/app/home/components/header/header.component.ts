import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RequestSearch } from '../../models/request.search.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  model: string = '';
  filtro: boolean = false;
  saveUsername: boolean;
  modelChanged = new Subject<string>();
  @Output() searchcriteria = new EventEmitter<RequestSearch>();

  requestSearch: RequestSearch = {
    value: '',
    arttist: false,
    album: false,
    music: false,
  };

  constructor() {
    this.modelChanged.pipe(debounceTime(500)).subscribe(() => {
    this.getResults();
    });
  }

  getResults()
  {    
    if (this.model.length > 0) {
      this.requestSearch.value = this.model;
      this.searchcriteria.emit(this.requestSearch);
    }
  }
  ativarFiltro() {
    this.filtro = !this.filtro;
  }

  setArtist(event: any) {
    this.requestSearch.arttist = event.checked;
    this.getResults();
    console.log(event.checked);
  }

  setAlbum(event: any) {
    this.requestSearch.album = event.checked;
    this.getResults();
    console.log(event.checked);
  }

  setMusic(event: any) {
    this.requestSearch.music = event.checked;
    this.getResults();
    console.log(event.checked);
  }

  ngOnInit(): void {}
  changed(event: any) {
    this.modelChanged.next();
  }
}
