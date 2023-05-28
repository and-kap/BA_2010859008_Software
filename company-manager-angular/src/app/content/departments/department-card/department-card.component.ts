import {Component, Input} from '@angular/core';
import {Department} from "../../../services/model/department.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss']
})
export class DepartmentCardComponent {
  @Input()
  public department!: Department;

  constructor(private router: Router) {
  }

  public navToDetail(departmentId?: number): void {
    this.router.navigate(['departments/'.concat(departmentId ? String(departmentId) : 'new')]);
  }
}
