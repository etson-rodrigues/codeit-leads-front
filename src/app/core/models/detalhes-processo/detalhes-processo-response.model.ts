import { AbstractResponse } from '../comum/abstract-response';

export interface ParteResponse {
    tipo: string; 
    nome: string; 
    cpf: string; 
    cnpj: string;
}

export interface ParteReceitaPjResponse {
    cnpj: string; 
    nome: string; 
    atividadePrincipalDescricao: string; 
    situacao: string; 
    capitalSocial: string; 
    logradouro: string; 
    numero: string; 
    bairro: string; 
    municipio: string; 
    uf: string; 
    cep: string; 
    telefone: string; 
    email: string;
}

export interface AndamentoResponse {
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
        partesAtivas: ParteResponse[];
        partesPassivas: ParteResponse[];
        outrasPartes: ParteResponse[];
    };
    partesReceitaPj: ParteReceitaPjResponse[];
    andamentos: AndamentoResponse[];
}

export interface DetalhesProcessoResponse extends AbstractResponse<DetalhesProcesso[]> {}
