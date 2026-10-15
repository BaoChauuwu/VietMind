export interface ApiErrorResponse {
  error: {
    code: 'NOT_FOUND' | 'METHOD_NOT_ALLOWED' | 'INTERNAL_SERVER_ERROR';
    message: string;
  };
}
