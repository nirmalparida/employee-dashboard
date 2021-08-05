import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['fullName', 'jobTitle', 'department', 'location', 'age', 'salary'];
  dataSource = new MatTableDataSource<Employee>(this.empService.getEmployeeData());

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private authService: AuthService, private empService: EmployeeService) {

  }

  ngOnInit(): void {
  }
  onLogout() {
    this.authService.logout();
  }
}
