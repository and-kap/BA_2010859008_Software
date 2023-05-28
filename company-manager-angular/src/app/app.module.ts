import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './frame/header/header.component';
import { DepartmentsComponent } from './content/departments/departments.component';
import { EmployeesComponent } from './content/employees/employees.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './frame/footer/footer.component';
import { EmployeeDetailComponent } from './content/employees/employee-detail/employee-detail.component';
import { DepartmentDetailComponent } from './content/departments/department-detail/department-detail.component';
import { DepartmentCardComponent } from './content/departments/department-card/department-card.component';
import { EmployeeCardComponent } from './content/employees/employee-card/employee-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DepartmentsComponent,
    EmployeesComponent,
    FooterComponent,
    EmployeeDetailComponent,
    DepartmentDetailComponent,
    DepartmentCardComponent,
    EmployeeCardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserAnimationsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
