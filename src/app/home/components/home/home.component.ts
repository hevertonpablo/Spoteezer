import { Image as ArtistImage } from './../../models/image.model';
import { Artist } from './../../models/artist.model';
import { Album } from '../../models/album.model';
import { Track } from '../../models/track.model';
import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { RequestSearch } from '../../models/request.search.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listMusic: string[] = [
    'Novo Som',
    'Oficina',
    'Ferrugem',
    'Marília Mendonça',
    'Maiara & Maraisa',
    'Jorge & Matheus',
    'Metállica',
    'Nirvana',
    'Nickelback',
    'Creed',
    'Alice In Chains',
  ];

  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];

  images: ArtistImage[] = [];
  defaultImage: ArtistImage = {
    height: 200,
    url: 'assets/images/no-name.png',
    width: 200,
  };

  constructor(private service: HomeService) {}

  ngOnInit(): void {
    const index = Math.floor(Math.random() * this.listMusic.length);
    this.search(this.listMusic[index]);
  }
  //undefined,artist,albummusic
  //artist,,albummusic
  //https://api.spotify.com/v1/search?q=&type=artist,album,track&ids
  //https://api.spotify.com/v1/search?q=ferrugem&type=…efinedartist&ids=106fe663bbae4b6e9e18308babfcc14a

  searchThis(data: RequestSearch) {
    let typeString: string[] = [];
    let filterParam: string = '';

    if (data.arttist) {
      typeString.push('artist');
    }

    if (data.album) {
      typeString.push('album');
    }

    if (data.music) {
      typeString.push('track');
    }

    if (typeString.length == 0) {
      this.search(data.value);
      return;
    }
   

    typeString.forEach((element: string, index: number) => {
       
   
      console.log(`Index: ${index} / Elemento: ${element} / Length: ${typeString.length}`)

      if ((typeString.length - 1) == index) {
        filterParam = filterParam + element;
      } 
      else if(typeString.length == 1)
      {
        filterParam = element;
      }
      else if(index == 0)
      {
        filterParam = element + ',';
      }
      else {
        filterParam = filterParam +  element + ',';
      }
    });

    this.search(data.value, filterParam);

  }

  search(value: string, type: string = 'artist,album,track') {
    this.service.search(value, type).subscribe((r: any) => {

      this.cleanSources();

      if(r.artists)
      {
        r.artists.items.forEach((element: Artist) => {
          element.score = this.getScore(element.popularity);
  
          if (element.images.length == 0) {
            this.images.push(this.defaultImage);
            element.images = this.images;
          }
  
          if (element.genres.length == 0) {
            element.genres.push('Indefinido');
          }
        });

        this.artists = r.artists?.items;
      }
    
      if(r.albums)
      {
        this.albums = r.albums?.items;
      }

      if(r.tracks)
      {
        this.tracks = r.tracks?.items;
        console.log(this.tracks);
      }  


    });
  }

  getScore(popularity: any): string {
    if (popularity >= 80) {
      return 'HOT';
    } else if (popularity >= 60 && popularity <= 79) {
      return 'COOL';
    } else if (popularity >= 30 && popularity <= 59) {
      return 'OK';
    } else {
      return 'UNDERGROWND';
    }
  }

  cleanSources()
  {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
