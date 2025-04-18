import { CommonModule, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Episode, SingleSeries } from '../../types/video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-tv-show-details',
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.css'
})
export class TvShowDetailsComponent {
  videoId: string | null = null;
  video?: SingleSeries;
  currentSeason = signal<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  } | undefined>(undefined)
  episodes = signal<Episode | undefined>(undefined)

  constructor(private route: ActivatedRoute, private videoService: VideoService) {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      this.getVideoDetails()
    });
  }
  getVideoDetails() {

    if (this.videoId && this.videoId.trim() !== '' && !isNaN(parseInt(this.videoId))) {
      this.videoService.getShowDetails(parseInt(this.videoId)).subscribe((response) => {
        const base_backdrop_url = response.base_backdrop_url
        const base_url = response.base_url
        this.video = { ...response, poster_path: `${base_url}${response.poster_path}`, backdrop_path: `${base_backdrop_url}${response.backdrop_path}` }
        this.currentSeason.set(this.video.seasons.find((s) => s.season_number === 1))
      })
      this.getEpisodes(Number(this.videoId),1)
    }
  }
  changeSeason(event: Event) {
    const selectedSeason = event.target as HTMLSelectElement
    if (selectedSeason) {
      const newSeason = this.video?.seasons.find((s) => s.season_number === Number(selectedSeason))
      if (newSeason){
        this.currentSeason.set(newSeason)
        this.getEpisodes(Number(this.videoId),newSeason.season_number)
      }

    }
  }
  getEpisodes(tvId:number, season:number){
    this.videoService.getSeasonEpisodes(tvId, season).subscribe((response) => {
      this.episodes.set(response)
    })
  }

}
