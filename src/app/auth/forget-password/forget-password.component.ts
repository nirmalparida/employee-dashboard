import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  isSpinnerLoading = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onReset() {
    this.router.navigate(['/resetPassword']);
  }
  onCancel() {
    this.router.navigate(['/login']);
  }
}
