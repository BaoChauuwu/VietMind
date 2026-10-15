import express, { type Express } from 'express';
import { createEmployeeRouter } from './routes/employeeRoutes.js';
import { EmployeeController } from './controllers/employeeController.js';
import { EmployeeService } from './services/employeeService.js';
import { EmployeeRepository } from './repository/employeeRepository.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export function createApp(): Express {
  const repository = new EmployeeRepository();
  const service = new EmployeeService(repository);
  const controller = new EmployeeController(service);
  const app = express();
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });
  app.use('/api/employees', createEmployeeRouter(controller));
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
