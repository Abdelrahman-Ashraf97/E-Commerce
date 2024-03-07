import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from 'src/app/core/shared/interfaces/wishlist';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { EcommerceapiService } from 'src/app/core/shared/services/ecommerceapi.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _EcommerceapiService:EcommerceapiService,private _ToastrService:ToastrService,private _CartService:CartService){}
  wishListDetails:Wishlist[]=[]


  ngOnInit(): void {
    this.getUserWishList();
  }
  getUserWishList(){
    this._EcommerceapiService.getWishList().subscribe({
      next:(response)=>{
        this.wishListDetails=response.data;

      }
    })
  }

  deleteProduct(id:string){
    this._EcommerceapiService.deleteWishListItem(id).subscribe({
      next:(response)=>{

        this.getUserWishList();


      },
      error:()=>{
        this.wishListDetails=[];
      }
    })
  }

  addtocart(productId:string){
    this._CartService.addcart(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message,"",{
          closeButton:true,
          timeOut:2000

        })
        this._CartService.cartNumber.next(response.numOfCartItems)
        this.deleteProduct(productId)

      }

    })

  }


}
