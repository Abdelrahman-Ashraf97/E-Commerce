import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/shared/interfaces/product';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { EcommerceapiService } from 'src/app/core/shared/services/ecommerceapi.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  searchInput:string="";
  products:Product[]=[];
  constructor( private _EcommerceapiService:EcommerceapiService, private _CartService:CartService, private _ToastrService:ToastrService){}

  myWishList:string[]=[""];
  ngOnInit(): void {
    this._EcommerceapiService.getAllProducts().subscribe({
      next:(response)=>{
        this.products=response.data;
      }
    })
    this._EcommerceapiService.getWishList().subscribe({
      next:(response)=>{
        for (const item of response.data) {
          this.myWishList.push(item._id)

        }

      }
    })

  }
  addtocart(productId:string){
    this._CartService.addcart(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message,"",{
          closeButton:true,
          timeOut:3000
        })
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
    })

  }

  addToWishList(id:string){
    this._EcommerceapiService.addtoWishList(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message,"",{
          closeButton:true,
          timeOut:3000

        })
        this.myWishList=response.data;
      }
    })

  }
  deleteProduct(id:string){
    this._EcommerceapiService.deleteWishListItem(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message,"",{
          closeButton:true,
          timeOut:3000

        })
        this.myWishList=response.data;
      }

    })
  }


}
