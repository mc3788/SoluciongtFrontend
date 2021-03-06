import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {

  transform(value): string {
    return value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }

}
