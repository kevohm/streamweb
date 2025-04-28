import { Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Genre, Series } from '../../types/video';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  series = signal<Series[]>([]);
  trendingSeries = signal<Series[]>([]);
  topRatedSeries = signal<Series[]>([]);
  topSeries = signal<Series | undefined>(undefined);
  seriesGenres = signal<Genre[]>([])
  loadingSeries = signal<boolean>(true);

  seriesByGenre = signal<Record<string, Series[]>>({});

  constructor(private videoService: VideoService) { }

  init() {
    this.loadingSeries.set(true);

    forkJoin({
      series: this.videoService.getSeries(),
      trendingSeries: this.videoService.getTrendingSeries(),
      topRatedSeries: this.videoService.getTopRatedSeries(),
      genres: this.videoService.getSeriesGenres()
    }).subscribe(({ series, trendingSeries, topRatedSeries, genres }) => {
      const base_url = series.base_url;
      const base_backdrop_url = series.base_backdrop_url;

      this.series.set(series.results.map(s => ({
        ...s,
        poster_path: `${base_url}${s.poster_path}`,
        backdrop_path: `${base_backdrop_url}${s.backdrop_path}`
      })));

      const trendingS = trendingSeries.results.map((s, i) => {
        const finalS = {
          ...s,
          poster_path: `${base_url}${s.poster_path}`,
          backdrop_path: `${base_backdrop_url}${s.backdrop_path}`
        };
        if (i === 0) this.topSeries.set(finalS);
        return finalS;
      });
      this.trendingSeries.set(trendingS);

      this.topRatedSeries.set(topRatedSeries.results.map(s => ({
        ...s,
        poster_path: `${base_url}${s.poster_path}`,
        backdrop_path: `${base_backdrop_url}${s.backdrop_path}`
      })));
      this.seriesGenres.set(genres)
      this.fetchSeriesByGenres(genres.map(g => g.id));
      this.loadingSeries.set(false);
    });
  }

  fetchSeriesByGenres(genreIds: number[]) {
    const genreRequests = genreIds.map(id =>
      this.videoService.getSeries({ genre: id })
    );

    forkJoin(genreRequests).subscribe((responses) => {
      const grouped: Record<string, Series[]> = {};

      responses.forEach((response, index) => {
        const genre = this.seriesGenres().find(g => g.id === genreIds[index]);
        const genreName = genre?.name || `Genre ${genreIds[index]}`;
        const base_url = response.base_url;
        const base_backdrop_url = response.base_backdrop_url;

        grouped[genreName] = response.results.map(s => ({
          ...s,
          poster_path: `${base_url}${s.poster_path}`,
          backdrop_path: `${base_backdrop_url}${s.backdrop_path}`
        }));
      });

      this.seriesByGenre.set(grouped);
    });
  }
}
