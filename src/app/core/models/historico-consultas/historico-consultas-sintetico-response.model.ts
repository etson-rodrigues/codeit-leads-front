import { Paginate } from '../comum/paginate.model';

export interface HistoricoConsultasSinteticoResponseData {
    usuarioEmail: string;
    tipoConsulta: string;
    situacaoConsulta: string;
    totalConsultas: number;
    quantidadeTotalCreditos: number;
}

export interface HistoricoConsultasSinteticoResponse extends Paginate {
    data: HistoricoConsultasSinteticoResponseData[];
}
