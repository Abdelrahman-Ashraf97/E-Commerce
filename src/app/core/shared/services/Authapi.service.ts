import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {
  decodeUserData:any;
  constructor( private _HttpClient:HttpClient, private _Router:Router) { }

  setRegister(userData:object):Observable<any>{
     return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData
     )
  };

  setLogin(userData:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin",userData)
  }
  saveUserData(){
    if(localStorage.getItem("uToken")!= null){
      let encodeToken:any=localStorage.getItem("uToken");
    this.decodeUserData=jwtDecode(encodeToken)

    }}
    signoutUser(){
      localStorage.removeItem("uToken");
      this._Router.navigate(["/login"])
      this.decodeUserData="";



    }

    forgetPassword(email:string):Observable<any>{
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
        "email":email
      })
    }
    verfiyPassword(resetCode:string):Observable<any>{
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
        "resetCode":resetCode
    })

    }

    resetNewPassword(data:any):Observable<any>{
      return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,data)

    }




  }

