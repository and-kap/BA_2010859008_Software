import {Department} from "./department.model";

export interface Employee {
  id: number;
  lastname: string;
  manager: {
    id: number;
    lastname: string
  } | null;
  salary: number;
  job: string;
  hireDate: string;
  department: Department | null;
  commission: number;
}
