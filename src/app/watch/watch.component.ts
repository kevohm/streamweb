import { Component, computed, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SingleMovie, SingleSeries } from '../../types/video';
import { VideoService } from '../services/video.service';

type VideoType = 'tv' | 'movie';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  standalone: true,
})
export class WatchComponent {
  sources: Record<string, { movie: (id: string) => string, tv: (id: string, episode: string, season: string) => string }> = {
    vidsrc: {
      movie: (id: string) => `https://vidsrc.xyz/embeded/movie/${id}`,
      tv: (id: string, episode: string = "1", season: string = "1") => `https://vidsrc.xyz/embeded/tv/${id}/${season}-${episode}`,
    },
    videasy: {
      movie: (id: string) => `https://player.videasy.net/movie/${id}`,
      tv: (id: string, episode: string = "1", season: string = "1") => `https://player.videasy.net/tv/${id}/${season}/${episode}`,
    },
    '111movie': {
      movie: (id: string) => `https://111movies.com/movie/${id}`,
      tv: (id: string, episode: string = "1", season: string = "1") => `https://111movies.com/tv/${id}/${season}/${episode}`,
    },
  };

  sourceNames = Object.keys(this.sources);
  videoId = signal<string | undefined>(undefined);
  videoType = signal<VideoType | undefined>(undefined);
  currentSource = signal<string>('videasy');
  movie = signal<SingleMovie | undefined>(undefined)
  series = signal<SingleSeries | undefined>(undefined)
  loading = signal<boolean>(true)
  episode: string = "1"
  season: string = "1"


  safeUrl = computed(() => {
    const id = this.videoId();
    const type = this.videoType();
    const source = this.currentSource();
    if (id && type && this.sources[source]) {
      const urlGenerator = this.sources[source][type];
      return (type === "movie") ? this.sanitizer.bypassSecurityTrustResourceUrl(`${urlGenerator(id, this.episode, this.season)}`) : this.sanitizer.bypassSecurityTrustResourceUrl(`${urlGenerator(id, this.episode, this.season)}`);
    }
    return undefined;
  });

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private videoService: VideoService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const vidType = this.route.snapshot.queryParamMap.get('type');
    const episode = this.route.snapshot.queryParamMap.get('e');
    const season = this.route.snapshot.queryParamMap.get('s');
    if (season && episode) {
      this.season = season
      this.episode = episode
    }
    if (id && vidType && ['tv', 'movie'].includes(vidType)) {
      this.videoId.set(id);
      this.videoType.set(vidType as VideoType);
      if (this.videoType() === "movie") {
        this.videoService.getMovieDetails(parseInt(this.videoId()!)).subscribe((response) => {
          const base_backdrop_url = response.base_backdrop_url;
          const base_url = response.base_url;
          this.movie.set({
            ...response,
            poster_path: `${base_url}${response.poster_path}`,
            backdrop_path: `${base_backdrop_url}${response.backdrop_path}`,
          })
        });
      } else if (this.videoType() === "tv") {
        this.videoService.getShowDetails(parseInt(this.videoId()!)).subscribe((response) => {
          const base_backdrop_url = response.base_backdrop_url
          const base_url = response.base_url
          this.series.set({ ...response, poster_path: `${base_url}${response.poster_path}`, backdrop_path: `${base_backdrop_url}${response.backdrop_path}` })
        })
      }
      this.loading.set(false)
    }

  }

  updateSource(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      const newSource = selectElement.value;
      if (newSource && this.sources[newSource]) {
        this.currentSource.set(newSource);
      }
    }
  }
}
