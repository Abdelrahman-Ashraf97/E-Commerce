import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/shared/interfaces/product';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { EcommerceapiService } from 'src/app/core/shared/services/ecommerceapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy  {
  item:Product={} as Product;
  subEl!:Subscription;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: true
  }
  constructor( private _ActivatedRoute:ActivatedRoute, private _EcommerceapiService:EcommerceapiService, private _CartService:CartService,private _ToastrService:ToastrService){}
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          let id:string=params.get("id")!;
        this.subEl= this._EcommerceapiService.getProductData(id).subscribe({
            next:(response)=>{
              this.item=response.data;
            }
          })

        }
      })
  }

  addtocart(productId:string){
    this._CartService.addcart(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message,"",{
          closeButton:true
        })

      }
    })

  }
  ngOnDestroy(): void {
    this.subEl.unsubscribe()

  }



}
