import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('video')
export class MovieController {

    constructor(private readonly movieService: MovieService) {}
    @Get()
    async getMovie(@Query() query: { i?: string; t?: string; type?: string; y?: string; plot?: string; r?: string }) {
      return this.movieService.fetchMovie(query);
    }
    @Get("movies")
    async getMovies(@Query() query: { page?: number, genre?:string, sort_by?: string}) {
      return this.movieService.fetchMovies(query);
    }
    @Get("series")
    async getSeries(@Query() query: { page?: number, genre?:string, sort_by?: string }) {
      return this.movieService.fetchTvShows(query);
    }
    @Get("movies-genres")
    async getMoviesGenres() {
      return this.movieService.fetchMovieGenres();
    }
    @Get("series-genres")
    async getSeriesGenres() {
      return this.movieService.fetchTvShowGenres();
    }
    @Get("trending-movies")
    async getTrendingMovies(@Query() query: { page?: number }) {
      return this.movieService.fetchTrendingMovies(query={page:query.page || 1});
    }
    @Get("trending-series")
    async getTrendingSeries(@Query() query: { page?: number }) {
      return this.movieService.fetchTrendingTvShows(query={page:query.page || 1});
    }
    @Get("top-rated-movies")
    async getTopRatedMovies(@Query() query: { page?: number }) {
      return this.movieService.fetchTopRatedMovies(query={page:query.page || 1});
    }
    @Get("top-rated-series")
    async getTopRatedSeries(@Query() query: { page?: number }) {
      return this.movieService.fetchTopRatedTvShows(query={page:query.page || 1});
    }

}
