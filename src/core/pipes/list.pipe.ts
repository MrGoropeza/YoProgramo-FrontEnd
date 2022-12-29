import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: any[], field?: string, delimiter?: string) {
    return value.reduce(
      (prev, current, index, array) => {
        if(index !== array.length - 1){
          return prev += current[field!] + (delimiter ? delimiter : ", ")
        }else{
          return prev += current[field!]
        }
      }, 
      ""
    )

  }

}
