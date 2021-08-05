import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isSpinnerLoading = false;
   private authStatusSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authSatus => {
          this.isSpinnerLoading = false;
      });
  }

  signupHandler(form: NgForm) {
    if (form.invalid) return;
    this.authService.signUp(form.value.email, form.value.password)
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
