import { Component, Input } from '@angular/core';
import { Movie } from '../../../types/video';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe, RouterLink, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie?:Movie = undefined
  @Input() height:number | string = 350;
  @Input() width:number | string = 230;

}
