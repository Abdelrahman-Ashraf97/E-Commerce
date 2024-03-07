import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { BlankNavComponent } from './components/blank-nav/blank-nav.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule}from'@angular/common/http';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component'
import { AuthapiService } from './core/shared/services/Authapi.service';
import{BrowserAnimationsModule}from"@angular/platform-browser/animations"
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { SearchPipePipe } from './core/shared/pipes/search-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerfiyPasswordComponent } from './components/verfiy-password/verfiy-password.component';
import { MyhttpInterceptor } from './core/shared/interceptors/myhttp.interceptor';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/shared/interceptors/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    AuthNavComponent,
    BlankNavComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    RegisterComponent,
    LoginComponent,
    DetailsComponent,
    BlankLayoutComponent,
    AuthLayoutComponent,
    MainSliderComponent,
    SearchPipePipe,
    CheckOutComponent,
    AllordersComponent,
    SubCategoryComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerfiyPasswordComponent,
    WishlistComponent
  ],
  imports: [

  BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule



  ],
  providers: [AuthapiService,{provide:HTTP_INTERCEPTORS,useClass:MyhttpInterceptor,multi:true},{provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
