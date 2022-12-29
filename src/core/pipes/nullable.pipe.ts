import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullable'
})
export class NullablePipe implements PipeTransform {

  transform(value: any, valueIfNull: string): string {
    return value === null ? valueIfNull : value;
  }

}
