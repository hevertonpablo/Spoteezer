import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SidemenuComponent } from './components/sides/sidemenu/sidemenu.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { ArtistComponent } from './components/artist/artist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumComponent } from './components/album/album.component';
import { TrackComponent } from './components/track/track.component';



@NgModule({
  declarations: [
    HomeComponent,
    SidemenuComponent,
    HeaderComponent,
    BannerComponent,
    ArtistComponent,
    AlbumComponent,
    TrackComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class HomeModule { }
