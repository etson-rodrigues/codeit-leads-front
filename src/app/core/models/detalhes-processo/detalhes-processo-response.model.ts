import { AbstractResponse } from "../comum/abstract-response";

export interface AndamentosResponseList {
  data: string;
  descricao: string;
  detalhes: string;
}

export interface DetalhesProcesso {
  nup: string;
  valorCausa: string;
  vara: string;
  dataAutuacao: string;
  comarca: string;
  uf: {
    codigo: string;
    descricao: string;
  };
  dataInicial: string;
  partes: {
    partesAtivas: string[];
    partesPassivas: string[];
    outrasPartes: string[];
  }
  andamentos: AndamentosResponseList[];
}

export interface DetalhesProcessoResponse extends AbstractResponse<DetalhesProcesso[]> { }