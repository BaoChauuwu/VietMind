import { Router } from 'express';
import type { EmployeeController } from '../controllers/employeeController.js';
import { sendJson } from '../utils/response.js';

export function createEmployeeRouter(controller: EmployeeController): Router {
  const router = Router();
  router.route('/')
    .all((request, response, next) => {
      if (request.method === 'GET') {
        next();
        return;
      }
      sendJson(response, 405, {
        error: { code: 'METHOD_NOT_ALLOWED', message: 'API chi ho tro GET.' }
      }, { Allow: 'GET' });
    })
    .get(controller.getEmployees);
  return router;
}
