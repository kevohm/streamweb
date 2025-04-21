import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { OmdbMovie } from '../../types/video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-rating',
  imports: [NgIf, NgxSkeletonLoaderModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit {
  @Input() movieId?: number;
  movieWithRating?: OmdbMovie

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    if (this.movieId) {
      this.videoService.getRatings(this.movieId).subscribe((response) => {
        console.log(response)
        this.movieWithRating = response
      });
    }
  }

  getRottenTomatoesRating(ratings?: { Source: string; Value: string }[]): string {
    if (ratings) {
      const rottenTomatoes = ratings.find(rating => rating.Source === 'Rotten Tomatoes');
      if (rottenTomatoes) {
        return rottenTomatoes.Value;
      }
    }
    return 'N/A';
  }
}
