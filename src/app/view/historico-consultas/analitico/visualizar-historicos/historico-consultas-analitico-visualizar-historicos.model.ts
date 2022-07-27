export interface HistoricoConsultasAnaliticoView {
    dataConsulta: string;
    usuarioEmail: string;
    razaoSocial: string;
    nup: string;
    valorCausa: number;
    criterioData: string;
    dataInicial: string;
    dataFinal: string;
    tribunais: string;
    uf: string;
    pagina: number;
    tipoConsulta: string;
    situacaoConsulta: string;
    quantidadeCreditos: number;
    resultado: string;
}

export interface HistoricoConsultasFilterOptions {
    value: string;
    viewValue: string;
}

export interface HistoricoConsultasSelectedFilters {
    key: string;
    name: string;
}

export interface UsuarioFilter {
    id: number;
    email: string;
}
