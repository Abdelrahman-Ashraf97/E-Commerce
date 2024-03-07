import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthapiService } from 'src/app/core/shared/services/Authapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnDestroy{
  constructor(private _AuthapiService:AuthapiService,private _Router:Router){}

  loginForm:FormGroup=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.pattern(/^[A-Z][A-Za-z1-9]{6,10}$/)]),

  })

  msg:string="";
  flag:boolean=false;
  subscribeEl:Subscription=new Subscription();

 login():void{

    if(this.loginForm.valid){
      this.flag=true;
     this .subscribeEl= this._AuthapiService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          this.flag=false;
         if(response.message=="success"){

          localStorage.setItem("uToken",response.token)
          this._AuthapiService.saveUserData();
          this._Router.navigate(["/home"])
         }
        },
        error:(err:HttpErrorResponse)=>{
          this.flag=false;
           this.msg=err.error.message
        }
        }
        )
    }
    }

    ngOnDestroy(): void {
        this.subscribeEl.unsubscribe();
    }


}
