import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appPadStart',
  standalone: true
})
export class PadStartPipe implements PipeTransform {
  transform(
    value: string | number | undefined | null,
    len = 3,
    padWith = '0',
  ): unknown {
    if (!value) {
      return '0'.padStart(len, padWith);
    }

    return String(value).padStart(len, padWith);
  }
}
