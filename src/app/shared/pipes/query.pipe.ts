import { Pipe, PipeTransform } from '@angular/core';
import { QueryInfoData } from '../interfaces/a-staff';

@Pipe({
  name: 'query'
})
export class QueryPipe implements PipeTransform {

  transform(items: QueryInfoData[], searchText: string): QueryInfoData[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();

    return items.filter(myItem => {
      return myItem.tsID.toLocaleLowerCase().includes(searchText);

    });

  }

}
