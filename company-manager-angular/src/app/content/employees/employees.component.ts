import {AfterContentInit, AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Pagination} from "../../services/model/pagination.model";
import {BaseApi} from "../../services/api/base.api";
import {Employee} from "../../services/model/employee.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy, AfterViewChecked, AfterContentInit {
  public page!: Pagination<Employee>;

  public employees!: Employee[];
  public size: number = 1_000;


  constructor(private baseApi: BaseApi<Employee>,
              private router: Router) {

  }

  ngOnInit(): void {
    this.baseApi.getAll('/employees', {
      'page': '0',
      'size': '50'
    }).then(result => this.page = result as Pagination<Employee>);
  }

  ngOnDestroy(): void {

  }

  ngAfterContentInit() {
    console.log('afterContentInit')
  }

  ngAfterViewChecked() {
    performance.mark('domManipulationEnd');
    const mark = (performance.getEntriesByName('domManipulationStart')[0] as PerformanceMark) || null;
    if (mark) {
      const measurement = performance.measure('domManipulation', 'domManipulationStart', 'domManipulationEnd');
      this.baseApi.log({event: mark.detail, size: this.size, time: measurement.duration});
    }
    performance.clearMarks();
    performance.clearMeasures();
  }

  public addEmployees(): void {
    this.employees = [];
    performance.mark('domManipulationStart', {detail: 'domManipulation_ADD'});
    for (let i = 0; i < this.size; i++)
      this.employees.push({
        id: i + 1,
        lastname: 'Doe',
        job: 'Tester',
        hireDate: new Date().toISOString(),
        department: null,
        manager: null,
        salary: 1234,
        commission: 0
      });
  }

  public updateEmployees(): void {
    performance.mark('domManipulationStart', {detail: 'domManipulation_EDIT'});
    this.employees.forEach((emp, idx) => {
      if (idx % 2 === 0) {
        emp.job = 'Test Manager';
        emp.salary = 2345;
        emp.hireDate = new Date(new Date().getMilliseconds() + 24 * 60 * 60 * 1000).toISOString();
      }
    });
  }

  public deleteEmployees(): void {
    performance.mark('domManipulationStart', {detail: 'domManipulation_DELETE'});
    for (let i = 0; i < this.size; i++)
      this.employees.pop();
  }

  public sendBulkRequest(): void {
    performance.mark('domManipulationStart', {detail: 'domManipulation_BULK_REQUEST'});

    const ids = new Array(this.size).fill(1).map((v, idx) => v + idx);
    this.baseApi.put('/employees/bulk', ids).then((result: Employee[]) => {
      this.employees = result;
    });
  }

  public sendSingleRequests(): void {
    const promises: Promise<any>[] = [];
    performance.mark('domManipulationStart', {detail: 'domManipulation_SINGLE_REQUESTS'});

    const ids = new Array(this.size).fill(1).map((v, idx) => v + idx);

    ids.forEach(id => promises.push(this.baseApi.put('/employees/single/'.concat(String(id)), {})));
    Promise.all(promises).then(results => {
      for (let i = 0; i < results.length; i++) {
        this.employees[i] = results[i];
      }
    })
  }
}
