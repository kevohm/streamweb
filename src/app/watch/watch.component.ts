import { Component, computed, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { SingleMovie, SingleSeries } from '../../types/video';

type VideoType = 'tv' | 'movie';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  standalone: true,
})
export class WatchComponent {
  sources: Record<string, { movie: string; tv: string }> = {
    vidsrc: {
      movie: 'https://vidsrc.xyz/embeded/movie/',
      tv: 'https://vidsrc.xyz/embeded/tv/',
    },
    videasy: {
      movie: 'https://player.videasy.net/movie/',
      tv: 'https://player.videasy.net/tv/',
    },
    '111movie': {
      movie: 'https://111movies.com/movie/',
      tv: 'https://111movies.com/tv/',
    },
  };

  sourceNames = Object.keys(this.sources);
  videoId = signal<string | undefined>(undefined);
  videoType = signal<VideoType | undefined>(undefined);
  currentSource = signal<string>('vidsrc');
  movie = signal<SingleMovie | undefined>(undefined)
  series = signal< SingleSeries | undefined>(undefined)
  loading = signal< boolean >(true)


  safeUrl = computed(() => {
    const id = this.videoId();
    const type = this.videoType();
    const source = this.currentSource();
    if (id && type && this.sources[source]) {
      const baseUrl = this.sources[source][type];
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}${id}?autoPlay=false`);
    }
    return undefined;
  });

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private videoService:VideoService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const vidType = this.route.snapshot.queryParamMap.get('type');
    if (id && vidType && ['tv', 'movie'].includes(vidType)) {
      this.videoId.set(id);
      this.videoType.set(vidType as VideoType);
      if(this.videoType() === "movie"){
        this.videoService.getMovieDetails(parseInt(this.videoId()!)).subscribe((response) => {
          const base_backdrop_url = response.base_backdrop_url;
          const base_url = response.base_url;
          this.movie.set({
            ...response,
            poster_path: `${base_url}${response.poster_path}`,
            backdrop_path: `${base_backdrop_url}${response.backdrop_path}`,
          })
        });
      }else if(this.videoType() === "tv"){
        this.videoService.getShowDetails(parseInt(this.videoId()!)).subscribe((response) => {
          const base_backdrop_url = response.base_backdrop_url
          const base_url = response.base_url
          this.series.set({ ...response, poster_path: `${base_url}${response.poster_path}`, backdrop_path: `${base_backdrop_url}${response.backdrop_path}` })
        })
      }
      this.loading.set(false)
    }
    this.loading.set(false)

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
