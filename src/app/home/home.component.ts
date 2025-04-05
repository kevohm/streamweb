import { Component, OnInit } from '@angular/core';
import { Movie, Series } from '../../types/video';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-home',
  imports: [MovieCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: Movie[] = []
  series: Series[] = []
  topRatedMovies: Movie[] = []
  topRatedSeries: Series[] = []
  trendingMovies: Movie[] = []
  trendingSeries: Series[] = []
  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getMovies().subscribe((response) => {
      const base_url = response.base_url
      this.movies = response.results.map((movie) => ({ ...movie, poster_path: `${base_url}${movie.poster_path}`, backdrop_path: `${base_url}${movie.backdrop_path}` }));
    });
    this.videoService.getSeries().subscribe((response) => {
      const base_url = response.base_url
      this.series = response.results.map((movie) => ({ ...movie, poster_path: `${base_url}${movie.poster_path}`, backdrop_path: `${base_url}${movie.backdrop_path}` }));
    });
    this.videoService.getTrendingMovies().subscribe((response) => {
      const base_url = response.base_url
      this.trendingMovies = response.results.map((movie) => ({ ...movie, poster_path: `${base_url}${movie.poster_path}`, backdrop_path: `${base_url}${movie.backdrop_path}` }));
    });
    this.videoService.getTrendingSeries().subscribe((response) => {
      const base_url = response.base_url
      this.trendingSeries = response.results.map((movie) => ({ ...movie, poster_path: `${base_url}${movie.poster_path}`, backdrop_path: `${base_url}${movie.backdrop_path}` }));
    });
    this.videoService.getTopRatedMovies().subscribe((response) => {
      const base_url = response.base_url
      this.topRatedMovies = response.results.map((movie) => ({ ...movie, poster_path: `${base_url}${movie.poster_path}`, backdrop_path: `${base_url}${movie.backdrop_path}` }));
    });
    this.videoService.getTopRatedSeries().subscribe((response) => {
      const base_url = response.base_url
      this.topRatedSeries = response.results.map((movie) => ({ ...movie, poster_path: `${base_url}${movie.poster_path}`, backdrop_path: `${base_url}${movie.backdrop_path}` }));
    });

  }
}
