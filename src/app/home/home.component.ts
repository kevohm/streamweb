import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie, Series } from '../../types/video';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';
import { RatingComponent } from '../rating/rating.component';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-home',
  imports: [MovieCarouselComponent, RouterLink, CommonModule, RatingComponent],
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
  topMovie?: Movie;
  topSeries?: Series;
  loading = signal<boolean>(true)
  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getMovies().subscribe((response) => {
      const base_url = response.base_url
      const base_backdrop_url = response.base_backdrop_url
      this.movies = response.results.map((movie) => {
        const poster_path = `${base_url}${movie.poster_path}`
        const backdrop_path = `${base_backdrop_url}${movie.backdrop_path}`
        this.preloadImage(poster_path)
        this.preloadImage(backdrop_path)
        return { ...movie, poster_path, backdrop_path }
      });
    });
    this.videoService.getSeries().subscribe((response) => {
      const base_url = response.base_url
      const base_backdrop_url = response.base_backdrop_url

      this.series = response.results.map((movie) => {
        const poster_path = `${base_url}${movie.poster_path}`
        const backdrop_path = `${base_backdrop_url}${movie.backdrop_path}`
        this.preloadImage(poster_path)
        this.preloadImage(backdrop_path)
        return { ...movie, poster_path, backdrop_path }
      });
    });
    this.videoService.getTrendingMovies().subscribe((response) => {
      const base_url = response.base_url
      const base_backdrop_url = response.base_backdrop_url
      this.trendingMovies = response.results.map((movie, index) => {
        const poster_path = `${base_url}${movie.poster_path}`
        const backdrop_path = `${base_backdrop_url}${movie.backdrop_path}`
        this.preloadImage(poster_path)
        this.preloadImage(backdrop_path)
        const finalMovie = { ...movie, poster_path, backdrop_path }
        if (index === 0) {
          this.topMovie = finalMovie
        }
        return finalMovie
      });
    });
    this.videoService.getTrendingSeries().subscribe((response) => {
      const base_url = response.base_url
      const base_backdrop_url = response.base_backdrop_url
      this.trendingSeries = response.results.map((movie, index) => {
        const poster_path = `${base_url}${movie.poster_path}`
        const backdrop_path = `${base_backdrop_url}${movie.backdrop_path}`
        this.preloadImage(poster_path)
        this.preloadImage(backdrop_path)
        const finalSeries =  { ...movie, poster_path, backdrop_path }
        if (index === 0) {
          this.topSeries = finalSeries
        }
        return finalSeries
      });
    });
    this.videoService.getTopRatedMovies().subscribe((response) => {
      const base_url = response.base_url
      const base_backdrop_url = response.base_backdrop_url
      this.topRatedMovies = response.results.map((movie) => {
        const poster_path = `${base_url}${movie.poster_path}`
        const backdrop_path = `${base_backdrop_url}${movie.backdrop_path}`
        this.preloadImage(poster_path)
        this.preloadImage(backdrop_path)
        return  { ...movie, poster_path, backdrop_path }
      });
    });
    this.videoService.getTopRatedSeries().subscribe((response) => {
      const base_url = response.base_url
      const base_backdrop_url = response.base_backdrop_url
      this.topRatedSeries = response.results.map((movie) =>{
        const poster_path = `${base_url}${movie.poster_path}`
        const backdrop_path = `${base_backdrop_url}${movie.backdrop_path}`
        this.preloadImage(poster_path)
        this.preloadImage(backdrop_path)
        return  { ...movie, poster_path, backdrop_path }
      });
    });
    this.loading.set(false)
  }
  preloadImage(url: string): void {
    const img = new Image();
    img.src = url;
  }
}
