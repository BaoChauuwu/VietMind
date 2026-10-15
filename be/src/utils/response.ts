import type { Response } from 'express';
import type { ApiErrorResponse } from '../types/api.js';
import type { EmployeeListResponse } from '../types/employee.js';

export function sendJson(
  response: Response<EmployeeListResponse | ApiErrorResponse>,
  statusCode: number,
  body: EmployeeListResponse | ApiErrorResponse,
  headers: Record<string, string> = {}
): void {
  response.status(statusCode).set({ 'Cache-Control': 'no-store', ...headers }).json(body);
}
