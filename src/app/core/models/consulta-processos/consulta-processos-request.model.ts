export interface ConsultaProcessosRequest {
    razaoSocialCnpj?: string;
    nup?: string;
    valorCausa?: number;
    criterioData?: string;
    dataInicial?: string;
    dataFinal: string;
    tribunais?: string[];
    uf?: string;
}
