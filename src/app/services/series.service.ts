import { Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Series } from '../../types/video';
import { VideoService } from '../video.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  series = signal<Series[]>([]);
  trendingSeries = signal<Series[]>([]);
  topRatedSeries = signal<Series[]>([]);
  topSeries = signal<Series | undefined>(undefined);
  loadingSeries = signal<boolean>(true);

  constructor(private videoService: VideoService) {}

  init() {
    this.loadingSeries.set(true);

    forkJoin({
      series: this.videoService.getSeries(),
      trendingSeries: this.videoService.getTrendingSeries(),
      topRatedSeries: this.videoService.getTopRatedSeries()
    }).subscribe(({ series, trendingSeries, topRatedSeries }) => {
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

      this.loadingSeries.set(false);
    });
  }
}
