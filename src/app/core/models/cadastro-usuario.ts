import { AbstractResponse } from "./comum/abstract-response";

export interface CadastroUsuario {
  email: string;
  senha: string;
  perfil: {
    codigo: string,
    descricao: string
  },
  ativo: boolean;
  primeiroAcesso: boolean;
}

export interface CadastroUsuarioResponse extends AbstractResponse<CadastroUsuario> { }