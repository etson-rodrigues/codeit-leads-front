export interface ConsultaProcessosRequest {
    razaoSocial: string;
    criterioData: string | null;
    dataInicial: string | null;
    dataFinal: string;
}
