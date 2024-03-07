import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(products: Product[],search:string): Product[] {
   return products.filter((item)=>
   item.title.toLowerCase().includes(search.toLowerCase())
   )
  }
}
