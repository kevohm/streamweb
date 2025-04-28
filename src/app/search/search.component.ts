import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, Series } from '../../types/video';
import { MovieCardComponent } from '../movie-carousel/movie-card/movie-card.component';
import { SeriesCardComponent } from '../movie-carousel/series-card/series-card.component';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-search',
  imports: [MovieCardComponent, SeriesCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  movies = signal<Movie[]>([])
  series = signal<Series[]>([])
  videoType = signal<"tv" | "movie">("movie")
  loading = signal<boolean>(true)
  searchQuery = signal<string | undefined>(undefined)



  constructor(private videoService: VideoService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let query = this.route.snapshot.queryParamMap.get('q');
    let page = this.route.snapshot.queryParamMap.get('page');
    let type = this.route.snapshot.queryParamMap.get('type');
    if (!query) {
      query = ""
    }
    this.searchQuery.set(query)
    if (!page) {
      page = "1"
    }

    if (type && ["tv", "movie"].includes(type)) {
      this.videoType.set(type as ("tv" | "movie"))
    }
    this.videoService.searchAll({ query, page }).subscribe((response) => {
      console.log(response)
      const base_url = response.base_url
      const base_backdrop_url = response.base_backdrop_url
      const movies: Movie[] = []
      const series: Series[] = []
      response.results.forEach((video) => {
        const poster_path = `${base_url}${video.poster_path}`
        const backdrop_path = `${base_backdrop_url}${video.backdrop_path}`
        if (video?.media_type === "movie") {
          movies.push({ ...video, poster_path, backdrop_path } as Movie)
        } else if (video.media_type === "tv") {
          series.push({ ...video, poster_path, backdrop_path } as Series)
        }
      })
      this.movies.update(() => [...movies]);
      this.series.update(() => [...series]);

      this.loading.set(false)
    })
  }
}
