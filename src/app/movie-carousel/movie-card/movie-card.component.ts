import { Component, Input } from '@angular/core';
import { Movie } from '../../../types/video';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie?:Movie = undefined
}
