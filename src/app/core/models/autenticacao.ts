import { AbstractResponse } from "./comum/abstract-response";


interface AcaoSeguranca {
  acaoSeguranca: {
    codigo: string,
    descricao: string
  }
}
export interface Autenticacao {
  id: number,
  email: string,
  accessToken: string,
  redefinirSenha: boolean,
  perfil: {
    codigo: string,
    descricao: string,
    acoesSeguranca: AcaoSeguranca[]
  }
}

export interface LoginResponse extends AbstractResponse<Autenticacao> { }