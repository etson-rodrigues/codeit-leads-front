export interface ErrorResponse {
  status: string | number;
  title: string;
  errors: ErrorDetail;
}

export class ErrorDetail {
  [key: string]: any;
}

export type Progress = 'asc' | 'desc' | 'default';

export type ErrorData = {
  error: ErrorResponse,
  progress: Progress
}