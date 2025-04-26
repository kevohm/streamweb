import { Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Movie } from '../../types/video';
import { VideoService } from '../video.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);
  topRatedMovies = signal<Movie[]>([]);
  topMovie = signal<Movie | undefined>(undefined);
  loadingMovie = signal<boolean>(true);

  constructor(private videoService: VideoService) {}

  init() {
    this.loadingMovie.set(true);

    forkJoin({
      movies: this.videoService.getMovies(),
      trendingMovies: this.videoService.getTrendingMovies(),
      topRatedMovies: this.videoService.getTopRatedMovies()
    }).subscribe(({ movies, trendingMovies, topRatedMovies }) => {
      const base_url = movies.base_url;
      const base_backdrop_url = movies.base_backdrop_url;

      this.movies.set(movies.results.map(m => ({
        ...m,
        poster_path: `${base_url}${m.poster_path}`,
        backdrop_path: `${base_backdrop_url}${m.backdrop_path}`
      })));

      const trendingM = trendingMovies.results.map((m, i) => {
        const finalM = {
          ...m,
          poster_path: `${base_url}${m.poster_path}`,
          backdrop_path: `${base_backdrop_url}${m.backdrop_path}`
        };
        if (i === 0) this.topMovie.set(finalM);
        return finalM;
      });
      this.trendingMovies.set(trendingM);

      this.topRatedMovies.set(topRatedMovies.results.map(m => ({
        ...m,
        poster_path: `${base_url}${m.poster_path}`,
        backdrop_path: `${base_backdrop_url}${m.backdrop_path}`
      })));

      this.loadingMovie.set(false);
    });
  }
}
