import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: string | number | undefined | null): string {
    if (value === undefined || value === null || value === '') {
      return '';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return '';
    }

    if (numericValue >= 1e9) {
      return (numericValue / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (numericValue >= 1e6) {
      return (numericValue / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (numericValue >= 1e3) {
      return (numericValue / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return numericValue.toString();
  }
}
