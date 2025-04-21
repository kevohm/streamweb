import { Component, Input } from '@angular/core';
import { SingleEpisode } from '../../../types/video';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-episode-card',
  imports: [RouterLink],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.css'
})
export class EpisodeCardComponent {
  @Input() episode?:SingleEpisode = undefined
  @Input() height:number = 350;
  @Input() width:number = 230;
}
