import { Component, OnInit } from '@angular/core';
import { EcommerceapiService } from './../../core/shared/services/ecommerceapi.service';
import { AuthapiService } from 'src/app/core/shared/services/Authapi.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { Orders } from 'src/app/core/shared/interfaces/orders';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  constructor(private _AuthapiService:AuthapiService,private _CartService:CartService){}
  ordersDetails:Orders[]=[];
  ngOnInit(): void {
    this._AuthapiService.saveUserData()
    this._CartService.getUserOrders(this._AuthapiService.decodeUserData.id).subscribe({
      next:(response)=>{
        this.ordersDetails=response
        console.log(this.ordersDetails);



      }
    })
  }



}
