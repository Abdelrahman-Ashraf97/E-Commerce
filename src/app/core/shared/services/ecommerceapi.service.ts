import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceapiService {

  constructor(private _HttpClient:HttpClient) { }




  getAllProducts():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  getProductData(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getAllCategories():Observable<any>{
  return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  getAllBrands():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
 getSubCategories(id:string):Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      }

 addtoWishList(id:string):Observable<any>{
        return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
          productId:id
        },
       )

      }

getWishList():Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)

}
deleteWishListItem(id:string):Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)

}

}
