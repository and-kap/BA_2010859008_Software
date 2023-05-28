import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseApi} from "../../../services/api/base.api";
import {Department} from "../../../services/model/department.model";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit, OnDestroy {

  public formGroup!: FormGroup;
  public subscription!: Subscription;
  public departmentId!: number;

  public department!: Department;
  public fields: { key: string, label: string, required: boolean, type: string | null }[] = [
    {key: 'name', label: 'Name', required: true, type: 'text'},
    {key: 'location', label: 'Location', required: true, type: 'text'}
  ];

  constructor(private departmentApi: BaseApi<Department>,
              private location: Location,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.departmentId = Number(params.get('id')) || NaN;

      if (!isNaN(this.departmentId)) {
        this.getDepartmentDetails(this.departmentId);
      }
    });

    this.formGroup = new FormGroup({});
    this.fields.forEach(field => {
      const control = new FormControl(null);
      if (field.required) {
        control.addValidators(Validators.required);
      }
      this.formGroup.addControl(field.key, control);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private getDepartmentDetails(departmentId: number): void {
    this.departmentApi.get('/departments/'.concat(String(departmentId))).then(result => {
      this.department = result as Department;
      this.formGroup.patchValue(this.department);
    });
  }

  public navBack(): void {
    this.location.back();
  }

  public onDelete(): void {
    this.departmentApi.delete(`/departments/${this.departmentId}`).then(() => this.navBack());
  }

  public onSave(): void {
    const body = this.formGroup.getRawValue();

    if (!isNaN(this.departmentId)) {
      this.departmentApi.put(`/departments/${this.departmentId}`, body).then(() => this.navBack());
    } else {
      this.departmentApi.post(`/departments`, body).then(() => this.navBack());
    }
  }
}
