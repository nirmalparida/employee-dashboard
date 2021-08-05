import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http"
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [SignupComponent, ResetPasswordComponent, ForgetPasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
