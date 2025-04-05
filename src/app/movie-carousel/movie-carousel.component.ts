import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Movie, Series } from '../../types/video';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SeriesCardComponent } from './series-card/series-card.component';

@Component({
  selector: 'app-movie-carousel',
  imports: [CommonModule, MovieCardComponent, SeriesCardComponent],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent implements AfterViewInit  {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef<HTMLDivElement>;
  showPrev: boolean = false;
  showNext: boolean = true;
  startIndex = 0
  endIndex = 0

  @Input() movies:Movie[] = [];
  @Input() series:Series[] = [];
  ngAfterViewInit() {
    this.updateButtonVisibility();
  }

  scrollNext() {
    const container = this.scrollContainer.nativeElement;
    const flexContainer = this.videoContainer.nativeElement;
    const children = container.querySelectorAll('.cover');
    for (let child of Array.from(children)) {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const videoContainerRect = flexContainer.getBoundingClientRect();
      if (rect.right > videoContainerRect.right) {
        container.scrollTo({
          left: (child as HTMLElement).offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
        break;
      }
    }
  }

  scrollPrev() {
    const container = this.scrollContainer.nativeElement;
    const children = container.querySelectorAll('.cover');
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i] as HTMLElement;
      const rect = child.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (rect.left < containerRect.left) {
        container.scrollTo({
          left: child.offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
        break;
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateButtonVisibility();
  }

  updateButtonVisibility() {
    const container = this.scrollContainer.nativeElement;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    this.showPrev = container.scrollLeft > 0;
    this.showNext = container.scrollLeft < maxScrollLeft - 5;
  }

  onScroll() {
    this.updateButtonVisibility();
  }
}
