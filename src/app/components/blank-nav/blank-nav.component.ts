import { Component, OnInit } from '@angular/core';
import { AuthapiService } from 'src/app/core/shared/services/Authapi.service';
import { CartService } from 'src/app/core/shared/services/cart.service';

@Component({
  selector: 'app-blank-nav',
  templateUrl: './blank-nav.component.html',
  styleUrls: ['./blank-nav.component.css']
})
export class BlankNavComponent implements OnInit {
  constructor(private _AuthapiService:AuthapiService, private _CartService:CartService){}

  numberOfCartItem?:number;

  ngOnInit(): void {

    this._CartService.getcart().subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems)
        }

      }
    )

    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.numberOfCartItem=data;
      }
    })


  }
  logout(){
    this._AuthapiService.signoutUser();

  }

}
