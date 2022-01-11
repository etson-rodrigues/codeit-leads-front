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
  editado?: boolean;
}

export interface ConsultaUsuarioResponseData {
  id: number,
  email: string;
  senha: string;
  perfil: {
    codigo: string,
    descricao: string
  },
  ativo: boolean;
  primeiroAcesso: boolean;
}

export interface ConsultaUsuarioPaginateResponse {
  pageNumber: number,
  pageSize: number,
  firstPage: string,
  lastPage: string,
  totalPages: number,
  totalRecords: number,
  nextPage: string | null,
  previousPage: string | null,
  data: ConsultaUsuarioResponseData[]
}

export interface AtualizarStatusCadastroUsuario {
  id: number,
  email: string,
  status: boolean
}

export interface CadastroUsuarioResponse extends AbstractResponse<CadastroUsuario> { }