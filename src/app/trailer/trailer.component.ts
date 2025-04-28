import { Component, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Trailer } from '../../types/video';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-trailer',
  imports: [RouterLink],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.css'
})
export class TrailerComponent implements OnInit {
  videoType = signal<"tv" | "movie">("movie")
  videoId = signal<number>(0)
  trailers = signal<Trailer[]>([])
  loading = signal<boolean>(true)
  constructor(private videoService: VideoService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loading.set(true)
    const id$ = this.route.paramMap;
    const type$ = this.route.queryParamMap;

    combineLatest([id$, type$]).subscribe(([params, query]) => {
      const id = params.get("id");
      const type = query.get("type");

      if (id && !isNaN(Number(id))) {
        this.videoId.set(Number(id));
      }

      if (type && ["tv", "movie"].includes(type)) {
        this.videoType.set(type as "tv" | "movie");
      }

      if (this.videoId()) {
        this.videoService.getTrailer(this.videoId(), this.videoType()).subscribe((response) => {
          this.trailers.set(response);
        });
        this.loading.set(false)
      }
    });
  }
  getSafeYoutubeUrl(key: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${key}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
