import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SortBy } from 'types/movies.types';

@Injectable()
export class MovieService {
  private readonly apiKey?: string;
  private readonly baseUrl?: string;
  private readonly imageBaseUrl?: string;
  private readonly imageSize?: string;
  private readonly backdropImageSize?: string;
  private readonly baseImageUrl?: string;
  private readonly baseBackdropImageUrl?: string;
  private readonly OmdbBaseUrl?: string;
  private readonly OmdbApiKey?: string;

  constructor(private configService: ConfigService) {
    this.apiKey = configService.get<string>('TMDB_API_KEY');
    this.baseUrl = configService.get<string>('TMDB_API_URL');
    this.imageBaseUrl = configService.get<string>('TMDB_IMAGE_BASE_URL');
    this.imageSize = configService.get<string>('TMDB_IMAGE_SIZE')
    this.backdropImageSize = configService.get<string>('TMDB_BACKDROP_IMAGE_SIZE')
    this.baseImageUrl =  `${this.imageBaseUrl}${this.imageSize}`;
    this.baseBackdropImageUrl =  `${this.imageBaseUrl}${this.backdropImageSize}`;
    this.OmdbApiKey = this.configService.get<string>('OMDB_API_KEY');
    this.OmdbBaseUrl = this.configService.get<string>('OMDB_API_URL');
  }

  async fetchMovie(query: { i?: string; t?: string; type?: string; y?: string; plot?: string; r?: string }) {
    const { i, t, type, y, plot, r } = query;

    if (!i && !t) {
      throw new HttpException("Either 'i' (IMDb ID) or 't' (Title) is required.", HttpStatus.BAD_REQUEST);
    }
    if (!this.OmdbBaseUrl || !this.OmdbApiKey) {
      Logger.error("Invalid url (base_url)", 'MovieService')
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const response = await axios.get(this.OmdbBaseUrl, {
        params: { apikey: this.OmdbApiKey, i, t, type, y, plot: plot || 'short', r: r || 'json' },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async fetchFromTmdb(endpoint: string, params: Record<string, any>) {
    if (!this.apiKey) {
      Logger.error('TMDB_API_KEY is not defined', 'MovieService');
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        params: { ...params, api_key: this.apiKey },
      });
      return response.data;
    } catch (error) {
      Logger.error(`Error fetching data from TMDb: ${error.message}`, 'MovieService');
      throw new HttpException('Failed to fetch data from TMDb', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  private async formatMovies(data) {
    const genres = await this.fetchMovieGenres();
    const enrichedResults = data.results.map((movie) => {
      const genreNames = movie.genre_ids.map((id: number) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : 'Unknown';
      })
      return { ...movie, genres: genreNames };
    });
    return { ...data, results: enrichedResults }
  }
  private async formatSeries(data) {
    const genres = await this.fetchTvShowGenres();
    const enrichedResults = data.results.map((tvShow) => {
      const genreNames = tvShow.genre_ids.map((id: number) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : 'Unknown';
      })
      return { ...tvShow, genres: genreNames };
    });
    return { ...data, results: enrichedResults }
  }

  // Fetch genres for movies
  async fetchMovieGenres() {
    const endpoint = '/genre/movie/list';
    const params = {};
    const data = await this.fetchFromTmdb(endpoint, params);
    return data.genres; // Return the list of movie genres
  }

  // Fetch genres for TV shows
  async fetchTvShowGenres() {

    const endpoint = '/genre/tv/list';
    const params = {};
    const data = await this.fetchFromTmdb(endpoint, params);
    return data.genres; // Return the list of TV show genres
  }



  async fetchMovies(query: { page?: number, genre?: string, sort_by?:string}) {
    const endpoint = '/discover/movie';
    const params = { page: query.page, with_genres: query.genre, sort_by: query.sort_by };
    const data = await this.fetchFromTmdb(endpoint, params);
    const formattedData = await this.formatMovies(data)
    return { ...formattedData, base_url:this.baseImageUrl, base_backdrop_url:this.baseBackdropImageUrl }
  }

  async fetchTvShows(query: { page?: number, genre?: string,  sort_by?: string}) {
    const endpoint = '/discover/tv';
    const params = { page: query.page, with_genres: query.genre,  sort_by: query.sort_by };
    const data = await this.fetchFromTmdb(endpoint, params);
    const formattedData = await this.formatSeries(data)
    return { ...formattedData,  base_url:this.baseImageUrl, base_backdrop_url:this.baseBackdropImageUrl }
  }



  // Fetch trending movies
  async fetchTrendingMovies(query: { page: number }) {
    const endpoint = '/trending/movie/day';
    const params = query;
    const data = await this.fetchFromTmdb(endpoint, params);
    const formattedData = await this.formatMovies(data)
    return { ...formattedData,  base_url:this.baseImageUrl, base_backdrop_url:this.baseBackdropImageUrl };
  }

  // Fetch trending TV shows
  async fetchTrendingTvShows(query: { page: number }) {
    const endpoint = '/trending/tv/day';
    const params = query;
    const data = await this.fetchFromTmdb(endpoint, params);
    const formattedData = await this.formatSeries(data)
    return { ...formattedData,  base_url:this.baseImageUrl, base_backdrop_url:this.baseBackdropImageUrl };
  }

  // Fetch top-rated movies
  async fetchTopRatedMovies(query: { page: number }) {
    const endpoint = '/movie/top_rated';
    const params = query;
    const data = await this.fetchFromTmdb(endpoint, params);
    const formattedData = await this.formatMovies(data)
    return { ...formattedData,  base_url:this.baseImageUrl, base_backdrop_url:this.baseBackdropImageUrl };
  }

  // Fetch top-rated TV shows
  async fetchTopRatedTvShows(query: { page: number }) {
    const endpoint = '/tv/top_rated';
    const params = query;
    const data = await this.fetchFromTmdb(endpoint, params);
    const formattedData = await this.formatSeries(data)
    return { ...formattedData,  base_url:this.baseImageUrl, base_backdrop_url:this.baseBackdropImageUrl };
  }



  
  // Fetch movie details including IMDb and Rotten Tomatoes ratings
  async fetchMovieWithRatings(movieId: string) {
    try {
      // Fetch movie data from TMDb
      const {data} = await axios.get(`${this.baseUrl}/movie/${movieId}/external_ids`, {
        params: { api_key: this.apiKey },
      })
      const movieData = data
      // Fetch IMDb ID from TMDb external ids
      const imdbId = movieData?.imdb_id;
      if (!this.OmdbBaseUrl || !this.OmdbApiKey) {
        Logger.error("Invalid url (base_url)", 'MovieService')
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const response = await axios.get(this.OmdbBaseUrl, {params: { apikey: this.OmdbApiKey, i: imdbId}})
      const imdbRating = response.data
      return imdbRating
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchMovieDetails(movieId: string) {
    const endpoint = `/movie/${movieId}`;
    const params = {};
  
    try {
      const data = await this.fetchFromTmdb(endpoint, params);
      return {
        ...data,
        base_url:this.baseImageUrl,
        base_backdrop_url:this.baseBackdropImageUrl
      };
    } catch (error) {
      Logger.error(`Failed to fetch movie details for ID ${movieId}: ${error.message}`, 'MovieService');
      throw new HttpException('Failed to fetch movie details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
  async fetchSeriesDetails(seriesId: string) {
    const endpoint = `/tv/${seriesId}`;
    const params = {};
  
    try {
      const data = await this.fetchFromTmdb(endpoint, params);
      return {
        ...data,
        base_url: this.baseImageUrl,
        base_backdrop_url: this.baseBackdropImageUrl,
      };
    } catch (error) {
      Logger.error(`Failed to fetch series details for ID ${seriesId}: ${error.message}`, 'SeriesService');
      throw new HttpException('Failed to fetch series details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
