import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movie-carousel',
  imports: [CommonModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent implements AfterViewInit  {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef<HTMLDivElement>;
  showPrev: boolean = false;
  showNext: boolean = true;

  movies = [
    'https://image.tmdb.org/t/p/w200/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
    'https://image.tmdb.org/t/p/w200/rTh4K5uw9HypmpGslcKd4QfHl93.jpg',
    'https://image.tmdb.org/t/p/w200/q719jXXEzOoYaps6babgKnONONX.jpg',
    'https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    'https://image.tmdb.org/t/p/w200/6ELCZlTA5lGUops70hKdB83WJxH.jpg',
    'https://image.tmdb.org/t/p/w200/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
    'https://image.tmdb.org/t/p/w200/rTh4K5uw9HypmpGslcKd4QfHl93.jpg',
    'https://image.tmdb.org/t/p/w200/q719jXXEzOoYaps6babgKnONONX.jpg',
    'https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    'https://image.tmdb.org/t/p/w200/6ELCZlTA5lGUops70hKdB83WJxH.jpg',
  ];

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
