import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Episode, Movie, OmdbMovie, Series, SingleMovie, SingleSeries } from '../types/video';

type ApiResponse<T> = {
  "page": number,
  "results": T[],
  "total_pages": number,
  "total_results": number,
  "base_url": string,
  "base_backdrop_url": string,
}

type SingleMovieParams = {
  i?: string;
  t?: string;
  type?: 'movie' | 'series' | 'episode';
  y?: string;
  plot?: 'short' | 'full';
}
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = `${environment.apiUrl}/video`;

  constructor(private http: HttpClient) { }

  formatParams(params?: object) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          httpParams = httpParams.set(key, value);
        }
      });
    }
    return httpParams
  }
  getSingle(params?: SingleMovieParams): Observable<any> {
    let httpParams = this.formatParams(params)
    return this.http.get(this.apiUrl, { params: httpParams });
  }

  getMovieDetails(movieId: number): Observable<SingleMovie> {
    return this.http.get<SingleMovie>(`${this.apiUrl}/movies/query/${movieId}`);
  }
  getShowDetails(movieId: number): Observable<SingleSeries> {
    return this.http.get<SingleSeries>(`${this.apiUrl}/series/query/${movieId}`);
  }

  getMovies(params?: {
    page?: number;
  }): Observable<ApiResponse<Movie>> {
    let httpParams = this.formatParams(params)
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movies`, { params: httpParams });
  }

  getSeries(params?: {
    page?: number;
  }): Observable<ApiResponse<Series>> {
    let httpParams = this.formatParams(params)
    return this.http.get<ApiResponse<Series>>(`${this.apiUrl}/series`, { params: httpParams });
  }

  getTrendingMovies(params?: {
    page?: number;
  }): Observable<ApiResponse<Movie>> {
    let httpParams = this.formatParams(params)
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/trending-movies`, { params: httpParams });
  }

  getTrendingSeries(params?: {
    page?: number;
  }): Observable<ApiResponse<Series>> {
    let httpParams = this.formatParams(params)
    return this.http.get<ApiResponse<Series>>(`${this.apiUrl}/trending-series`, { params: httpParams });
  }
  getTopRatedMovies(params?: {
    page?: number;
  }): Observable<ApiResponse<Movie>> {
    let httpParams = this.formatParams(params)
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/top-rated-movies`, { params: httpParams });
  }

  getTopRatedSeries(params?: {
    page?: number;
  }): Observable<ApiResponse<Series>> {
    let httpParams = this.formatParams(params)
    return this.http.get<ApiResponse<Series>>(`${this.apiUrl}/top-rated-series`, { params: httpParams });
  }
  getRatings(movieId: number): Observable<OmdbMovie> {
    return this.http.get<OmdbMovie>(`${this.apiUrl}/movies/ratings/${movieId}`);
  }
  getSeasonEpisodes(tvId: number, season:number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/series/query/${tvId}/${season}`);
  }

}
