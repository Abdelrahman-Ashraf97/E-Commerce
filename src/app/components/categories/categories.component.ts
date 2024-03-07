import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/shared/interfaces/product';
import { EcommerceapiService } from 'src/app/core/shared/services/ecommerceapi.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit,OnDestroy {
  constructor(private _EcommerceapiService:EcommerceapiService){}
  categories:Category[]=[];
  subscriptionEl!:Subscription;
 

  ngOnInit(): void {
      this.subscriptionEl= this._EcommerceapiService.getAllCategories().subscribe({
        next:(response)=>{
          this.categories=response.data;
        }
      })
  }


  ngOnDestroy(): void {
    this.subscriptionEl.unsubscribe();

  }


}
