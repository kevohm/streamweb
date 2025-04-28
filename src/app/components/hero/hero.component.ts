import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RatingComponent } from '../../home/rating/rating.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterLink, RatingComponent, SearchComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input() backdrop: string | undefined = undefined
  @Input() id: number | undefined = undefined
  @Input() title: string | undefined = undefined
  @Input() overview: string | undefined = undefined
  @Input() type: "movie" | "tv" = "movie"
  constructor(private router: Router){}
  videoOptions =  [{title:"movies",slug:"movies",href:"/movie"}, {title:"tv shows",slug:"tv-shows",href:'/tv-show'}]
  openMenu = signal<boolean>(false)
  toggleOpenMenu(){
    this.openMenu.update((val)=>!val)
  }

  handleLinkClick(event: Event, link: string) {
    event.preventDefault(); // Stop normal <a> navigation
    this.toggleOpenMenu();  // First, run your function
    this.router.navigateByUrl(link); // Then, navigate manually
  }
  spliceText(desc?:string){
    if(!desc) return ""
    return `${desc.slice(0,100)}...`
  }
}
