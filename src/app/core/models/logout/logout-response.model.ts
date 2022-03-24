import { AbstractResponse } from '../comum/abstract-response';

interface LogoutResponseData {
    email: string;
}

export interface LogoutResponse extends AbstractResponse<LogoutResponseData> {}
