import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  isSpinnerLoading = false;
  employeeForm: FormGroup;
  constructor() { }

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

  }

}
