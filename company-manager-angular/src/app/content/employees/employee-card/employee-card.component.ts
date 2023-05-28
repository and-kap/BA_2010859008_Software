import {Component, Input} from '@angular/core';
import {Employee} from "../../../services/model/employee.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {
  @Input()
  public employee!: Employee;

  constructor(private router: Router) {

  }

  public navToDetail(employeeId?: number): void {
    this.router.navigate(['employees/'.concat(employeeId ? String(employeeId) : 'new')]);
  }

}
