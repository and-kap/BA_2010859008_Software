import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartmentsComponent} from "./content/departments/departments.component";
import {EmployeesComponent} from "./content/employees/employees.component";
import {EmployeeDetailComponent} from "./content/employees/employee-detail/employee-detail.component";
import {DepartmentDetailComponent} from "./content/departments/department-detail/department-detail.component";

const routes: Routes = [
  {
    path: 'departments/:id',
    component: DepartmentDetailComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: '**',
    redirectTo: '/employees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
