import { Component } from '@angular/core';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';

@Component({
  selector: 'app-home',
  imports: [MovieCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
