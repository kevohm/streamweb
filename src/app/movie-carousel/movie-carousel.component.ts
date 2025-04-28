import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { Movie, Series, SingleEpisode } from '../../types/video';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SeriesCardComponent } from './series-card/series-card.component';
import { EpisodeCardComponent } from './episode-card/episode-card.component';

@Component({
  selector: 'app-movie-carousel',
  imports: [CommonModule, MovieCardComponent, SeriesCardComponent, EpisodeCardComponent],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent implements OnInit, OnDestroy{
  @ViewChild('slider', { static: true }) slider!: ElementRef<HTMLDivElement>;
  @ViewChild('holder', { static: true }) holder!: ElementRef<HTMLDivElement>;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  @ViewChildren('movieCard') movieElements!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('nextbtn', { static: true }) next!: ElementRef<HTMLButtonElement>;
  @ViewChild('prevbtn', { static: true }) prev!: ElementRef<HTMLButtonElement>;

  private resizeTimeout: any;

  @Input() movies: Movie[] = [];
  @Input() series: Series[] = [];
  @Input() episodes: SingleEpisode[] = [];
  height:number = 350;
  width:number = 230;
  showNext = signal<boolean>(true)
  showPrev = signal<boolean>(false)
  
  
  
  ngOnInit(): void {
    this.adjustPosterWidth();
    
    // Add scroll listeners
    this.holder.nativeElement.addEventListener('scroll', this.updateButtonVisibility.bind(this));
    
    // Add button click listeners
    this.prev.nativeElement.addEventListener('click', this.scrollLeft.bind(this));
    this.next.nativeElement.addEventListener('click', this.scrollRight.bind(this));
    // Initial button visibility
    this.prev.nativeElement.style.display = "none";
  }
  @HostListener('window:resize')
  ngOnResize():void {
        // Debounce to prevent excessive calls
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    
        this.resizeTimeout = setTimeout(() => {
          this.adjustPosterWidth();
          this.updateButtonVisibility();
        }, 100); // Adjust debounce time as needed (milliseconds)
  }
  ngOnDestroy() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
  }

  adjustPosterWidth() {
    let WINDOW_WIDTH = window.innerWidth;
    const holder = this.holder.nativeElement;
    const containerWidth = holder.offsetWidth;
    const gap = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.25;
    let postersToShow;
    if (WINDOW_WIDTH <= 400) {
      postersToShow = 1;
    }else if (WINDOW_WIDTH <= 600 && WINDOW_WIDTH > 400) {
      postersToShow = 2;
    } else if (WINDOW_WIDTH > 600 && WINDOW_WIDTH <= 1024) {
      postersToShow = 3;
    } else if (WINDOW_WIDTH > 1024 && WINDOW_WIDTH <= 1440) {
      postersToShow = 5;
    } else if (WINDOW_WIDTH > 1440) {
      postersToShow = 6;
    } else {
      postersToShow = 3; // fallback
    }
    const totalGap = gap * (postersToShow - 1);
    const posterWidth = (containerWidth - totalGap) / postersToShow;

    this.width = posterWidth;
    this.height = posterWidth * 1.5;
  }

  updateButtonVisibility() {
    const holder = this.holder.nativeElement;
    const prev = this.prev.nativeElement;
    const next = this.next.nativeElement;

    if (holder.scrollLeft > 0) {
      prev.style.display = "flex"
    } else {
      prev.style.display = "none"
    }
    
    if (holder.scrollLeft + holder.offsetWidth >= holder.scrollWidth) {
      next.classList.remove("group-hover:flex")
      next.classList.add("group-hover:hidden")
    } else {
      next.classList.remove("group-hover:hidden")
      next.classList.add("group-hover:flex")
    }
  }

  scrollLeft() {
    const holder = this.holder.nativeElement;
    holder.scrollBy({
      left: -holder.offsetWidth,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const holder = this.holder.nativeElement;
    holder.scrollBy({
      left: holder.offsetWidth,
      behavior: 'smooth'
    });
  }
}
