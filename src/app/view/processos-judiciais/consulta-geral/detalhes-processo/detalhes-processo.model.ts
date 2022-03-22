export interface AndamentosViewList {
    data: string;
    descricao: string;
    detalhe: string;
}

export interface DetalhesProcessoView {
    nup: string;
    valorCausa: string;
    dataAutuacao: string;
    dataInicial: string;
    vara: string;
    comarca: string;
    uf: string;
    ativas: string[];
    passivas: string[];
    outras: string[];
    andamentos: AndamentosViewList[];
}
