import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeroComponent } from '../components/hero/hero.component';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';
import { MovieService } from '../services/movie.service';
import { SeriesService } from '../services/series.service';
import { RatingComponent } from './rating/rating.component';
import { LoadingComponent } from "../components/home/loading/loading.component";

@Component({
  selector: 'app-home',
  imports: [MovieCarouselComponent, LoadingComponent, CommonModule, HeroComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  videoType = signal<"movie" | "tv">("movie")
  videoTypeData = {
    movie: "movie",
    tv: "tv show"
  }
  videoOptions = Object.entries(this.videoTypeData)

  constructor(private router: Router, public movieService: MovieService, public seriesService: SeriesService) { }


  searchVideo(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query, type: this.videoType() } });
    }
  }
  changeVideoType(event: Event) {
    const target = event.target as HTMLSelectElement
    if (target.value) {
      this.videoType.set(target.value as "movie" | "tv")
    }

  }
}
