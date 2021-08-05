import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSpinnerLoading = false;
  private authStatusSub: Subscription
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authSatus => {
          this.isSpinnerLoading = false;
      });
  }
  onLogin(form: NgForm) {
    if (form.invalid) return;
    this.authService.login(form.value.email, form.value.password);
  }
  onSignup() {
    this.router.navigate(['/signup']);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
