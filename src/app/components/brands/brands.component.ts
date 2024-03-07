import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/core/shared/interfaces/product';
import { EcommerceapiService } from 'src/app/core/shared/services/ecommerceapi.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor( private _EcommerceapiService:EcommerceapiService){}
  brands:Brand[]=[];
  ngOnInit(): void {
      this._EcommerceapiService.getAllBrands().subscribe({
        next:(response)=>{
          this.brands=response.data
        }
      })

  }

}
