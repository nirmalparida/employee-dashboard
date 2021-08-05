import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isSpinnerLoading = false;
  constructor() { }

  ngOnInit(): void {
  }
  signupHandler(form: NgForm) {
    if (form.invalid) return;
    console.log("Signed up successfully");
  }
}
