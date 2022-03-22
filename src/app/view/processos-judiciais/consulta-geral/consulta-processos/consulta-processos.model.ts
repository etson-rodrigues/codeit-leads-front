export interface ConsultaProcessosView {
    nup: string;
    uf: string;
    partesAtivas: string;
    partesPassivas: string;
    primeiraData: string;
    dataUltimaAtualizacao: string;
}
export interface ConsultaProcessosFilterOptions {
    value: string;
    viewValue: string;
}
export interface ConsultaProcessosSelectedFilters {
    key: string;
    name: string;
}
