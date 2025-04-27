import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
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
}
