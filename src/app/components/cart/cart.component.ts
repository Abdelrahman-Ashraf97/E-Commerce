import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cartdetails } from 'src/app/core/shared/interfaces/cartdetails';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {
  constructor(private _CartService:CartService,private _ToastrService:ToastrService){}
  cartdetails:Cartdetails={} as Cartdetails;

  ngOnInit(): void {
    this._CartService.getcart().subscribe({
      next:(response)=>{
        console.log(response.data);

        this.cartdetails=response.data;
      },
      error:()=>{
        this.cartdetails.products=[];
      }
    })
  }

  deleteProduct(productId:string){
    this._CartService.deleteCartItem(productId).subscribe({
      next:(response:any)=>{
      this.cartdetails=response.data
      this._ToastrService.success("item is deleted")
      this._CartService.cartNumber.next(response.numOfCartItems)
      },
      })
    }
    updateCart(id:string,count:number){
     if(count>=1){
      this._CartService.updateCart(id,count).subscribe({
        next:(response)=>{
          this.cartdetails=response.data;
        }
      })
     }
     else{
      this.deleteProduct(id)
     }
    }
    clearCart(){
      this._CartService.clearCart().subscribe({
        next:(response:any)=>{
          this.cartdetails={}as Cartdetails ;
          this.cartdetails.products=[];
          this._CartService.cartNumber.next(0)

        }
      })

    }






  ngOnDestroy(): void {

  }

}
