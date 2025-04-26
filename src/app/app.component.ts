import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { MovieService } from './services/movie.service';
import { SeriesService } from './services/series.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  url = environment.apiUrl;
  title = 'angular-tutorial';
  constructor(private movieService:MovieService, private seriesService:SeriesService){}
  ngOnInit(): void {
    this.movieService.init()
    this.seriesService.init()
  }
}
