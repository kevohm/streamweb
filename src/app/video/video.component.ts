import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleMovie, SingleSeries } from '../../types/video';
import { VideoService } from '../video.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-video',
  imports: [NgIf, CommonModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  videoId: string | null = null;
  videoType: string | null = null;
  video?: SingleMovie | SingleSeries;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {
    this.route.queryParamMap.subscribe(params => {
      this.videoId = params.get('id');
      this.videoType = params.get('type');
      this.getVideoDetails()
    });
  }
  getVideoDetails() {

    if (this.videoId && this.videoId.trim() !== '' && !isNaN(parseInt(this.videoId))) {
      if(this.videoType === 'movie') {
        this.videoService.getMovieDetails(parseInt(this.videoId)).subscribe((response) => {
          const base_backdrop_url = response.base_backdrop_url
          const base_url = response.base_url
          this.video =  { ...response, poster_path: `${base_url}${response.poster_path}`, backdrop_path: `${base_backdrop_url}${response.backdrop_path}` }
        })
      }else if(this.videoType === 'tv_show'){
        this.videoService.getShowDetails(parseInt(this.videoId)).subscribe((response) => {
          const base_backdrop_url = response.base_backdrop_url
          const base_url = response.base_url
          this.video =  { ...response, poster_path: `${base_url}${response.poster_path}`, backdrop_path: `${base_backdrop_url}${response.backdrop_path}` }
        })
      }
    }
  }

}
