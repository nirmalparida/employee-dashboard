import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  isSpinnerLoading = false;
  employeeForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
     this.employeeForm = new FormGroup({
      'fullname': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      jobTitle: new FormControl(null, {
        validators: [Validators.required]
      }),
      department: new FormControl(null, {
        validators: [Validators.required],
      }),
      location: new FormControl(null, {
        validators: [Validators.required],
      }),
      age: new FormControl(null, {
        validators: [Validators.required],
      }),
      salary: new FormControl(null, {
        validators: [Validators.required],
      })
    });
  }

  onSaveEmployee() {
    if (this.employeeForm.invalid) return;

    this.router.navigate(['/employees'])
  }
  onLogout() {
    this.authService.logout();
  }
}
