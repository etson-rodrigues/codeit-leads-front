export interface ConsultaProcessosRequest {
    razaoSocialCnpj: string;
    criterioData: string | null;
    dataInicial: string | null;
    dataFinal: string;
}
