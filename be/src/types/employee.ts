import type { EmployeeResponseDto } from '../dtos/employeeResponseDto.js';

export type { Employee, EmployeeStatus } from '../models/employeeModel.js';

export interface EmployeeListResponse {
  data: EmployeeResponseDto[];
}
