import type { EmployeeRepository } from '../repository/employeeRepository.js';
import type { Employee } from '../models/employeeModel.js';

export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  listEmployees(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }
}
