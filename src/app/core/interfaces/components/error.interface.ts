export class ErrorDetail {
  [key: string]: any;
}

export interface ErrorResponse {
  status: string | number;
  title: string;
  errors: ErrorDetail;
}

export type Progress = 'asc' | 'desc' | 'default';

export interface ErrorDataInterface {
  error: ErrorResponse;
  progress: Progress;
}