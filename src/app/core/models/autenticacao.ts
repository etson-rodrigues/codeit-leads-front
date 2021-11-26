import { AbstractResponse } from "./comum/abstract-response";

interface Autenticacao {
  email: string;
  accessToken: string;
  accessType: string;
}

export interface LoginResponse extends AbstractResponse<Autenticacao>{}