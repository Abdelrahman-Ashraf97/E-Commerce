import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subcategory } from 'src/app/core/shared/interfaces/product';
import { EcommerceapiService } from 'src/app/core/shared/services/ecommerceapi.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit{

constructor(private  _EcommerceapiService:EcommerceapiService,private _ActivatedRoute:ActivatedRoute){}
id:any="";
subCategories:Subcategory[]=[];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
      this.id = params.get("id")
      this._EcommerceapiService.getSubCategories(this.id).subscribe({
        next:(response)=>{
          this.subCategories=response.data;



        }
      })
      }
    })


  }

}
