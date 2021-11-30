import { AbstractResponse } from "./comum/abstract-response";

export interface Autenticacao {
  email: string;
  accessToken: string;
  profile: {
    type: string,
    access: string[]
  }
}

export interface LoginResponse extends AbstractResponse<Autenticacao>{}