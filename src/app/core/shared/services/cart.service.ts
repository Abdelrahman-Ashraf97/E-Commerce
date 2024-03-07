import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor( private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)

  addcart(myProductId:string):Observable<any>{

    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart",
    { productId: myProductId }
    )
  }

  getcart():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart"
    )
  }

  deleteCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
    )

  }

  updateCart(id:string,count:number):Observable<any>{
     return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      "count": count
  }

    )
  }


  clearCart(){
     return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  checkout(id:string,data:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://github.com/Abdelrahman-Ashraf97/E-Commerce.git`,{
      shippingAddress:data
    }
    )

  }

  getUserOrders(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

  }


  cashPayment(id:string,data:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,{
      shippingAddress:data
    }
    )

  }


}
