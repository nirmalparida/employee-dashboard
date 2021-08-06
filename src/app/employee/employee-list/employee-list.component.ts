import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  employees: Employee[] = [];
  public userIsAuthenticated = false;
  userId: string;
  isSpinnerLoading: boolean = false;
  private employeesSub: Subscription;
  private authSatusSub: Subscription;

  displayedColumns: string[] = ['empId', 'fullName', 'jobTitle', 'department', 'location', 'age', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Employee>(this.empService.getEmployeeData());

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private authService: AuthService, private empService: EmployeeService) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.empService.getEmployeeData();
    this.isSpinnerLoading = true;
    this.employeesSub = this.empService.getUpdatedPostListner().subscribe((empData: {
    _employeeData: Employee[];
    }) => {
      this.isSpinnerLoading = false;
      this.employees = empData._employeeData;
    });

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authSatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
    });
  }

  onDelete(id: string) {
    this.isSpinnerLoading = true;
    this.empService.deleteEmployee(id).subscribe(() => {
      this.empService.getEmployeeData();
    }, () => {
      this.isSpinnerLoading = false;
    });
   }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.employeesSub.unsubscribe();
    this.authSatusSub.unsubscribe();
  }
}
