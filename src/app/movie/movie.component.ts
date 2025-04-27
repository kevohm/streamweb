import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { MovieService } from '../services/movie.service';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';
import { LoadingComponent } from '../components/home/loading/loading.component';

@Component({
  selector: 'app-movie',
  imports: [HeroComponent,MovieCarouselComponent,LoadingComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  constructor( public movieService: MovieService) { }

  getGenreKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }
  

}
