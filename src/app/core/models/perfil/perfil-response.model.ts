import { AbstractResponse } from "../comum/abstract-response";

export interface Perfil {
  codigo: string;
  descricao: string;
}

export interface PerfisListResponse extends AbstractResponse<Perfil[]> { }