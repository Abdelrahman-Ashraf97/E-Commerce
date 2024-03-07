import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthapiService } from 'src/app/core/shared/services/Authapi.service';

@Component({
  selector: 'app-verfiy-password',
  templateUrl: './verfiy-password.component.html',
  styleUrls: ['./verfiy-password.component.css']
})
export class VerfiyPasswordComponent {
  constructor(private _FormBuilder:FormBuilder,private _AuthapiService:AuthapiService,private _Router:Router){}

  formDetails=this._FormBuilder.group({
    resetCode:["",[Validators.required,Validators.pattern(/^[0-9]{6}$/)]]
  })
  msg:string=""
  flag:boolean=false;
  spin:boolean=false;

  verfiyPassword(){
    let resetCode:any=this.formDetails.get("resetCode")?.value
    this.spin=true

    this._AuthapiService.verfiyPassword(resetCode).subscribe({
      next:(response)=>{
        this.spin=false

        if(response.status=="Success"){
          this.msg=response.status
          this.flag= true;
          setTimeout(()=>{ this._Router.navigate(["/resetpassword"])},3000)
        }


      },
      error:(err)=>{
        this.spin=false


        this.msg=err.error.message;
        this.flag= false

      }
    })
  }



}
