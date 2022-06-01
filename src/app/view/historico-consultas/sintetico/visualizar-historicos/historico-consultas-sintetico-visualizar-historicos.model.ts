export interface HistoricoConsultasView {
    usuarioEmail: string;
    tipoConsulta: string;
    situacaoConsulta: string;    
    totalConsultas: number;
    quantidadeTotalCreditos: number;
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
