import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../../core/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  constructor( private _FormBuilder:FormBuilder, private _ActivatedRoute:ActivatedRoute,private _CartService:CartService, private _Router:Router, private _ToastrService:ToastrService){}
  cartId:any;
 ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
    this.cartId=params.get("id")




    }
  })
 }


  checkoutDetails:FormGroup=this._FormBuilder.group({
    details:["",[Validators.required]],
    phone:[ "",[Validators.required,Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]],
    city: ["",[Validators.required,Validators.minLength(3)]]
  })


  checkoutHandler(){
    this._CartService.checkout(this.cartId,this.checkoutDetails.value).subscribe({
      next:(response)=>{

        open(response.session.url)
      }
    })

  }
  cashHandler(){
    this._CartService.cashPayment(this.cartId,this.checkoutDetails.value).subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(0)

        this._ToastrService.success(response.status,"",{
          closeButton:true,
          timeOut:1000
        })
      }
    })
    setTimeout(()=>{ this._Router.navigate(['/home'])},3000)
  }






}
