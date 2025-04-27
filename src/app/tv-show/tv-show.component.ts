import { Component } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';
import { HeroComponent } from '../components/hero/hero.component';
import { LoadingComponent } from '../components/home/loading/loading.component';
import { Series } from '../../types/video';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tv-show',
  imports: [MovieCarouselComponent,HeroComponent,LoadingComponent],
  templateUrl: './tv-show.component.html',
  styleUrl: './tv-show.component.css'
})
export class TvShowComponent {
  constructor( public seriesService: SeriesService) { 
  }

  getGenreKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }
  
}
