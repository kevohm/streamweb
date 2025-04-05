import { Component, Input } from '@angular/core';
import { Series } from '../../../types/video';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-series-card',
  imports: [DatePipe],
  templateUrl: './series-card.component.html',
  styleUrl: './series-card.component.css'
})
export class SeriesCardComponent {
  @Input() series?:Series =undefined
}
