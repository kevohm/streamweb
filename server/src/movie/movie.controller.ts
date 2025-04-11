import { Controller, Get, Query, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('video')
export class MovieController {

    constructor(private readonly movieService: MovieService) {}
    @Get("movies/query")
    async getMovieFromQuery(@Query() query: { i?: string; t?: string; type?: string; y?: string; plot?: string; r?: string }) {
      return this.movieService.fetchMovie(query);
    }
    @Get("movies/ratings/:id")
    async getMovieRatings(@Param() params: {id:string}) {
      return this.movieService.fetchMovieWithRatings(params.id)
    }
    @Get("movies/query/:id")
    async getMovie(@Param() params: {id:string})  {
      return this.movieService.fetchMovieDetails(params.id);
    }
    @Get("series/query/:id")
    async getShow(@Param() params: {id:string})  {
      return this.movieService.fetchSeriesDetails(params.id);
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
