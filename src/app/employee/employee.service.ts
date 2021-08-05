import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './employee-data';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private EmployeeData: Employee[] = EMPLOYEES

  getEmployeeData() {
    console.log(this.EmployeeData);
    return [...this.EmployeeData]
  }
}
