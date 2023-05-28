import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../../services/model/department.model";
import {BaseApi} from "../../services/api/base.api";
import {Pagination} from "../../services/model/pagination.model";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  public page!: Pagination<Department>;

  constructor(private baseApi: BaseApi<Department>) {
  }

  ngOnInit(): void {
    this.baseApi.getAll('/departments', {
      'page': '0',
      'size': '50'
    }).then(result => this.page = result as Pagination<Department>);
  }

  ngOnDestroy(): void {

  }
}
