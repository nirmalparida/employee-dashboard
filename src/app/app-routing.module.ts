import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule) },
  { path: "employees", component: EmployeeListComponent },
  { path: "createEmployee", component: CreateEmployeeComponent},
  { path: 'edit/:empId', component: CreateEmployeeComponent },
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
