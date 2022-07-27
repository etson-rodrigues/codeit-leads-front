export interface ConsultaProcessosParameters {
    razaoSocialCnpj: string | null;
    nup: string | null;
    valorCausa: number | null;
    criterioData: string | null;
    dataInicial: string | null;
    dataFinal: string;
    tribunais: string[] | null;
    uf: string | null;
}
