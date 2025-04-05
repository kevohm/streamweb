import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Movie, Series } from '../types/video';

type ApiResponse<T> = {
  "page": number,
  "results": T[],
  "total_pages": number,
  "total_results": number,
  "base_url": string
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

}
