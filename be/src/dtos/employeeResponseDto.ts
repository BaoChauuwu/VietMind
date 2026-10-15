import type { Employee } from '../models/employeeModel.js';

export class EmployeeResponseDto {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  email: string;
  department: string;
  position: string;

  constructor(employee: Employee) {
    this.id = employee.employeeId;
    this.displayName = employee.displayName;
    this.avatarUrl = employee.avatarUrl;
    this.email = employee.email;
    this.department = employee.department;
    this.position = employee.position;
  }
}
