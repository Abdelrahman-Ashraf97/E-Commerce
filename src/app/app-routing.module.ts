import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './core/shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerfiyPasswordComponent } from './components/verfiy-password/verfiy-password.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  //blank layout
  {path:"",component:BlankLayoutComponent,canActivate:[authGuard] ,children:[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent,title:"Home"},
    {path:"details/:id",component:DetailsComponent,title:"Details"},
    {path:"cart",component:CartComponent,title:"Cart"},
    {path:"products",component:ProductsComponent,title:"Products"},
    {path:"categories",component:CategoriesComponent,title:"Categories"},
    {path:"brands",component:BrandsComponent,title:"Brands"},
    {path:"checkOut/:id",component:CheckOutComponent,title:"Check Out"},
    {path:"allorders",component:AllordersComponent,title:"Orders"},
    {path:"subCategory/:id",component:SubCategoryComponent,title:"Sub Category"},
    {path:"wishlist",component:WishlistComponent,title:"Wish List" }
  ]},

    //auth layout
  { path:"",component:AuthLayoutComponent,children:[
    { path:"register",component:RegisterComponent,title:"Register"},
    { path:"login",component:LoginComponent,title:"Login"},
    {path:"forgetpassword",component:ForgetPasswordComponent},
    { path:"resetpassword",component:ResetPasswordComponent},
    {path:"verfiypassword",component:VerfiyPasswordComponent}
  ]}
  ,{path:"**",component:NotFoundComponent,title:"Not Found"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
