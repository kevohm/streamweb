import { Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Genre, Movie } from '../../types/video';
import { VideoService } from '../video.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);
  topRatedMovies = signal<Movie[]>([]);
  topMovie = signal<Movie | undefined>(undefined);
  moviesGenres = signal<Genre[]>([])
  loadingMovie = signal<boolean>(true);
  movieByGenre = signal<Record<string, Movie[]>>({});

  constructor(private videoService: VideoService) {}

  init() {
    this.loadingMovie.set(true);

    forkJoin({
      movies: this.videoService.getMovies(),
      trendingMovies: this.videoService.getTrendingMovies(),
      topRatedMovies: this.videoService.getTopRatedMovies(),
      genres: this.videoService.getMoviesGenres()
    }).subscribe(({ movies, trendingMovies, topRatedMovies, genres }) => {
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
      this.moviesGenres.set(genres)
      this.fetchMoviesByGenres(genres.map((g)=>g.id))
      this.loadingMovie.set(false);
    });
  }


  
    fetchMoviesByGenres(genreIds: number[]) {
      const genreRequests = genreIds.map(id => 
        this.videoService.getMovies({genre:id})
      );
  
      forkJoin(genreRequests).subscribe((responses) => {
        const grouped: Record<string, Movie[]> = {};
  
        responses.forEach((response, index) => {
          const genre = this.moviesGenres().find(g => g.id === genreIds[index]);
          const genreName = genre?.name || `Genre ${genreIds[index]}`;
          const base_url = response.base_url;
          const base_backdrop_url = response.base_backdrop_url;
  
          grouped[genreName] = response.results.map(s => ({
            ...s,
            poster_path: `${base_url}${s.poster_path}`,
            backdrop_path: `${base_backdrop_url}${s.backdrop_path}`
          }));
        });
  
        this.movieByGenre.set(grouped);
      });
    }
}
