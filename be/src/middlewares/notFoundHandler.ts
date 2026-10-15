import type { RequestHandler } from 'express';
import { sendJson } from '../utils/response.js';

export const notFoundHandler: RequestHandler = (_request, response) => {
  sendJson(response, 404, {
    error: { code: 'NOT_FOUND', message: 'Khong tim thay API.' }
  });
};
