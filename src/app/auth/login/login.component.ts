import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSpinnerLoading = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onLogin(form: NgForm) {
    if (form.invalid) return;
    this.router.navigate(['/employees']);
  }
  onSignup() {
    this.router.navigate(['/signup']);
  }
}
