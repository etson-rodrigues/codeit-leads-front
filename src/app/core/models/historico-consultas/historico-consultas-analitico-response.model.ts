import { Paginate } from '../comum/paginate.model';

export interface HistoricoConsultasAnaliticoResponseData {
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

export interface HistoricoConsultasAnaliticoResponse extends Paginate {
    data: HistoricoConsultasAnaliticoResponseData[];
}
