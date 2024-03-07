import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthapiService } from 'src/app/core/shared/services/Authapi.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _FormBuilder:FormBuilder,private _AuthapiService:AuthapiService,private _Router:Router){}
  msg:string=""
  flag:boolean=false
  spin:boolean=false

  formDetails=this._FormBuilder.group({
    email:["",[Validators.required,Validators.email]]
  })

  resetPassword(){
    this.spin=true
   let emailInput:any=this.formDetails.get('email')?.value
   console.log(emailInput);

    this._AuthapiService.forgetPassword(emailInput).subscribe({
      next:(response)=>{
         this.spin=false
        this.msg=response.message;
       
        this.flag=true
        setTimeout(()=>{ this._Router.navigate(["/verfiypassword"])},3000)
      },
      error:(err)=>{
       this.spin=false
        this.msg=err.error.message;

        this.flag=false

      }
    })

  }


}
