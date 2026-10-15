import type { RequestHandler } from 'express';
import type { EmployeeService } from '../services/employeeService.js';
import { EmployeeResponseDto } from '../dtos/employeeResponseDto.js';
import { sendJson } from '../utils/response.js';

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  getEmployees: RequestHandler = async (_request, response) => {
    const employees = await this.employeeService.listEmployees();
    sendJson(response, 200, { data: employees.map((employee) => new EmployeeResponseDto(employee)) });
  };
}
