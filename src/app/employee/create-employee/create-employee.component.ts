import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  isSpinnerLoading = false;
  employeeForm: FormGroup;
  employee: Employee
  private mode = 'create';
  private empId: string;
  private authStatusSub: Subscription;

  constructor(private empService: EmployeeService,private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isSpinnerLoading = false;
      }
    )

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

     this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('empId')) {
        this.mode = 'edit';
        this.empId = paramMap.get('empId');
        this.isSpinnerLoading = true;
        this.empService.getEmployee(this.empId).subscribe(empData => {
          this.isSpinnerLoading = false;
          this.employee = {
            empId: empData._id,
            fullName: empData.fullName,
            jobTitle: empData.jobTitle,
            department: empData.department,
            location: empData.location,
            age: +empData.age,
            salary: +empData.salary,
          }
          this.employeeForm.setValue({
            fullName: this.employee.fullName,
            jobTitle: this.employee.jobTitle,
            department: this.employee.department,
            location: this.employee.location,
            age: this.employee.age,
            salary: this.employee.salary
          })
        });
      }
      else {
        this.mode = 'create';
        this.empId = null;
      }
    })
  }

  onSaveEmployee() {
    if (this.employeeForm.invalid) return;
    this.isSpinnerLoading = true;

    if (this.mode === 'create') {
      this.empService.saveEmployee(this.employeeForm.value.fullName, this.employeeForm.value.jobTitle, this.employeeForm.value.department,
          this.employeeForm.value.location, this.employeeForm.value.age, this.employeeForm.value.salary);
    } else {
      this.empService.updateEmployee(this.empId, this.employeeForm.value.fullName, this.employeeForm.value.jobTitle, this.employeeForm.value.department,
          this.employeeForm.value.location, +this.employeeForm.value.age, +this.employeeForm.value.salary)
    }
    this.employeeForm.reset();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
