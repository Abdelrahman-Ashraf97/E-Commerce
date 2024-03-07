import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthapiService } from 'src/app/core/shared/services/Authapi.service';



@Component({
  selector: 'app-register',
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

constructor(private _AuthapiService:AuthapiService,private _Router:Router){}

  registerForm:FormGroup=new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.pattern(/^[A-Z][A-Za-z1-9]{6,10}$/)]),
    rePassword:new FormControl(""),
    phone:new FormControl("",[Validators.required,Validators.pattern(/^(002)?01[1250][0-9]{8}$/)])
  },{ validators:[this.repasswordValidation]} as FormControlOptions)
  loginSubscribe!:Subscription;

  msg:string="";
  flag:boolean=false;



  repasswordValidation(group:FormGroup):void{
    let password:any=group.get('password');
    let rePassword:any=group.get('rePassword');

    if(rePassword?.value == ""){
     rePassword?.setErrors({required:true})
    }

   else if(password?.value != rePassword?.value){
     rePassword.setErrors({mismatch:true})
    } }




  registeration():void{
    if(this.registerForm.valid){
      this.flag=true;
    this.loginSubscribe=  this._AuthapiService.setRegister(this.registerForm.value).subscribe({
        next:(response)=>{
          this.flag=false;
          if(response.message=="success"){
            this._Router.navigate(["/login"])

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
      this.loginSubscribe?.unsubscribe();

    }


}
