import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category, Product } from 'src/app/core/shared/interfaces/product';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { EcommerceapiService } from 'src/app/core/shared/services/ecommerceapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{
  products:Product[]=[] ;
  categories:Category[]=[];
  subscribeEl!:Subscription;
  searchInput:string="";



  myWishList:string[]=[]


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  constructor(private _EcommerceapiService:EcommerceapiService,private _CartService:CartService,private _ToastrService:ToastrService,){}

  ngOnInit(): void {
   this.subscribeEl= this._EcommerceapiService.getAllProducts().subscribe({
      next:(response)=>{
        this.products=response.data;},
        error:(err)=>{

        }
      }
    )
    this.subscribeEl=this._EcommerceapiService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories=response.data;
      }
    })

    this.subscribeEl=this._EcommerceapiService.getWishList().subscribe({
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







  ngOnDestroy(): void {
      this.subscribeEl.unsubscribe()
  }



}
