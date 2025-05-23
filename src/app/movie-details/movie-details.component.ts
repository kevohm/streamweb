import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SingleMovie } from '../../types/video';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  videoId: string | null = null;
  video?: SingleMovie;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      this.getVideoDetails();
    });
  }
  getVideoDetails() {

    if (this.videoId && this.videoId.trim() !== '' && !isNaN(parseInt(this.videoId))) {
      this.videoService.getMovieDetails(parseInt(this.videoId)).subscribe((response) => {
        const base_backdrop_url = response.base_backdrop_url
        const base_url = response.base_url
        this.video = { ...response, poster_path: `${base_url}${response.poster_path}`, backdrop_path: `${base_backdrop_url}${response.backdrop_path}` }
      })

    }
  }

}
