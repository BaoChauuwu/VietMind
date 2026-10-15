import type { ErrorRequestHandler } from 'express';
import { sendJson } from '../utils/response.js';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, next) => {
  console.error('Loi xu ly request:', error);
  if (response.headersSent) {
    next(error);
    return;
  }
  sendJson(response, 500, {
    error: { code: 'INTERNAL_SERVER_ERROR', message: 'Da xay ra loi he thong.' }
  });
};
