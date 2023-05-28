import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseApi} from "../../../services/api/base.api";
import {Employee} from "../../../services/model/employee.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Pagination} from "../../../services/model/pagination.model";
import {Department} from "../../../services/model/department.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public subscription!: Subscription;
  public employeeId!: number;

  public employee!: Employee;
  public managers!: Employee[];
  public departments!: Department[];

  public fields: { key: string, label: string, required: boolean, default: any, type: string | null }[] = [
    {key: 'lastname', label: 'Lastname', required: true, default: '', type: 'text'},
    {key: 'job', label: 'Job', required: true, default: '', type: 'text'},
    {key: 'manager', label: 'Manager', required: true, default: null, type: null},
    {key: 'hireDate', label: 'Hiredate', required: true, default: '', type: 'date'},
    {key: 'salary', label: 'Salary', required: true, default: 0, type: 'number'},
    {key: 'commission', label: 'Commission', required: false, default: null, type: 'number'},
    {key: 'department', label: 'Department', required: true, default: null, type: null},
  ];

  constructor(private employeeApi: BaseApi<Employee>,
              private departmentApi: BaseApi<Department>,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.employeeId = Number(params.get('id')) || NaN;

      if (!isNaN(this.employeeId)) {
        this.getEmployeeDetails(this.employeeId);
      }
    });

    this.getManagers();
    this.getDepartments();

    this.formGroup = new FormGroup({});
    this.fields.forEach(field => {
      const control = new FormControl(field.default);
      if (field.required) {
        control.addValidators(Validators.required);
      }
      this.formGroup.addControl(field.key, control);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getEmployeeDetails(employeeId: number): void {
    this.employeeApi.get('/employees/'.concat(String(employeeId))).then(result => {
      this.employee = result;
      this.formGroup.patchValue({
        ...this.employee,
        department: this.employee.department?.id || null,
        manager: this.employee.manager?.id || null,
        hireDate: this.employee.hireDate?.split('T')[0]
      });
    });
  }

  private getManagers(): void {
    this.employeeApi.getAll('/employees', {
      'page': '0',
      'size': '50000'
    }).then(result => this.managers = (result as Pagination<Employee>).items);
  }

  private getDepartments(): void {
    this.departmentApi.getAll('/departments', {
      'page': '0',
      'size': '50000'
    }).then(result => this.departments = (result as Pagination<Department>).items);
  }

  public navBack(): void {
    this.location.back();
  }

  public onSave(): void {
    const body = this.formGroup.getRawValue();

    body.departmentId = body.department;
    body.managerId = body.manager;
    body.hireDate = new Date(body.hireDate).toISOString();

    delete body.manager;
    delete body.department;

    if (!isNaN(this.employeeId)) {
      this.employeeApi.put(`/employees/${this.employeeId}`, body).then(() => this.navBack());
    } else {
      this.employeeApi.post(`/employees`, body).then(() => this.navBack());
    }
  }

  public onDelete(): void {
    this.employeeApi.delete(`/employees/${this.employeeId}`).then(() => this.navBack());
  }
}
