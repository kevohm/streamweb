import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  videoType = signal<"movie" | "tv">("movie")
  videoTypeData = {
    movie: "movie",
    tv: "tv show"
  }
  videoOptions = Object.entries(this.videoTypeData)


  constructor(private router: Router) { }

  searchVideo(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query, type: this.videoType() } });
    }
  }
  changeVideoType(event: Event) {
    const target = event.target as HTMLSelectElement
    if (target.value) {
      this.videoType.set(target.value as "movie" | "tv")
    }

  }
}
