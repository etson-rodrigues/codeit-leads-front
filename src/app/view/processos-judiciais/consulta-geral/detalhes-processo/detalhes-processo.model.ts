export interface ParteView {
    tipo: string; 
    nome: string; 
    cpf: string; 
    cnpj: string;
}

export interface ParteReceitaPjView {
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

export interface AndamentoView {
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
    ativas: ParteView[];
    passivas: ParteView[];
    outras: ParteView[];
    partesReceitaPj: ParteReceitaPjView[];
    andamentos: AndamentoView[];
}
