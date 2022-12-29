import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'object'
})
export class ObjectPipe implements PipeTransform {

  transform(value: any, ...fields: string[]): string {

    let resultado = value;

    fields.forEach(
      field => resultado = resultado[field]
    );

    return resultado;
  }

}
