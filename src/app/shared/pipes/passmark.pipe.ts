import { Pipe, PipeTransform } from '@angular/core';
import { PassMark } from '../interfaces/students';

@Pipe({
  name: 'passmark'
})
export class PassmarkPipe implements PipeTransform {

  transform(items: PassMark[], searchText: string): PassMark[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();

    return items.filter(myItem => {
      return myItem.year.toLocaleLowerCase().includes(searchText);

    });

  }

}
