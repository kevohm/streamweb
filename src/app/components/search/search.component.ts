import { Component, ElementRef, Input, signal, ViewChild,input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @ViewChild('searchContainer', { static: true }) searchContainer!: ElementRef<HTMLDivElement>;
  @Input() onClick?:()=>void
  videoType = signal<"movie" | "tv">("movie")
  videoTypeData = {
    movie: "movie",
    tv: "tv show"
  }
  videoOptions = Object.entries(this.videoTypeData)
  showSearch = signal<boolean>(false)


  constructor(private router: Router) { }

  searchVideo(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();
    if (query) {
      if(this.onClick){
        this.onClick()
      }
      this.router.navigate(['/search'], { queryParams: { q: query, type: this.videoType() } });
    }
  }
  changeVideoType(event: Event) {
    const target = event.target as HTMLSelectElement
    if (target.value) {
      this.videoType.set(target.value as "movie" | "tv")
    }

  }
  toggleSearch() {
    this.showSearch.update((val) => !val)
  }
}
