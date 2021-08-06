import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Employee } from './employee';
import { EMPLOYEES } from './employee-data';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _employeeData: Employee[] = [...EMPLOYEES]
  private employeesUpdated = new Subject<{ _employeeData: Employee[] }>();

  constructor(private http: HttpClient, private router: Router){}
  getEmployeeData() {
    console.log(this._employeeData);
    return [...this._employeeData]
  }

  getEmployeeDataFromSever() {
    this.http.get<{ message: string, employees: any}>(BACKEND_URL)
      .pipe(map((empData) => {
        return {
          employeeData: empData.employees.map(employee => {
            return {
              empId: employee._id,
              fullName: employee.fullName,
              jobTitle: employee.jobTitle,
              department: employee.department,
              location: employee.location,
              age : employee.age,
              salary : employee.salary
            }
          })
        };
      }))
      .subscribe(transformedPostData => {
      this._employeeData = transformedPostData.employeeData;
      this.employeesUpdated.next({_employeeData: [...this._employeeData]});
    })
  }



  getUpdatedPostListner() {
   return this.employeesUpdated.asObservable();
  }

  getEmployee(empId: string) {
    return this.http.get<{_id: string, fullName: string, jobTitle: string, department: string, location: string, age:number, salary: number}>('http://localhost:3000/api/posts/' + empId)
  }
  saveEmployee(fullName: string, jobTitle: string, department: string, location: string, age:string, salary: string ) {
    const employeeData = new FormData();
    employeeData.append("fullName", fullName)
    employeeData.append("jobTitle", jobTitle)
    employeeData.append("department", department)
    employeeData.append("location", location)
    employeeData.append("age", age)
    employeeData.append("salary", salary)
    this.http.post<{ message: string}>(BACKEND_URL, employeeData)
      .subscribe((responseData) => {
        this.router.navigate(['/employees']);
    })
  }

  updateEmployee(id: string, fullName: string, jobTitle: string, department: string, location: string, age:number, salary: number) {
    let empData: Employee;

    empData = {
      empId: id,
      fullName: fullName,
      jobTitle: jobTitle,
      department: department,
      location: location,
      age: age,
      salary: salary
    };
    this.http.put(BACKEND_URL + id, empData)
      .subscribe(res => {
        this.router.navigate(['/employees']);
    })
  }

  deleteEmployee(empId: string) {
    return this.http.delete(BACKEND_URL + empId);
  }

}
