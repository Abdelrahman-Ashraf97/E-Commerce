import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthapiService } from 'src/app/core/shared/services/Authapi.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private _FormBuilder:FormBuilder,private _AuthapiService:AuthapiService,private _Router:Router){}
  msg:string=""
  flag:boolean=false
  spin:boolean=false;

  formDetails=this._FormBuilder.group({
    email:["",[Validators.required,Validators.email]],
    newPassword:["",[Validators.required,Validators.pattern(/^[A-Z][A-Za-z1-9]{6,10}$/)]]
  })

  resetNewPassword(){
    this.spin=true
    let data:any=this.formDetails.value
    console.log(data);


    this._AuthapiService.resetNewPassword(data).subscribe({
      next:(response)=>{
        this.spin=false;
        this.flag=true
        this.msg="Success";
        setTimeout(()=>{ this._Router.navigate(["/login"])},3000)
      },
      error:(err)=>{
        this.spin=false
        this.msg=err.error.message;
        this.flag=false

      }
    })

  }

}
