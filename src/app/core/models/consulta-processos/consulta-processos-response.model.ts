import { Paginate } from '../comum/paginate.model';

export interface ConsultaProcessosResponseData {
    numeroUnicoProtocolo: string;
    uf: {
        codigo: string;
        descricao: string;
    };
    sumarioInstancias: [
        {
            nomeInstancia: string;
            partesAtivas: string[];
            partesPassivas: string[];
            primeiraData: string;
        }
    ];
    dataUltimaAtualizacao: string;
}

export interface ConsultaProcessosResponse extends Paginate {
    data: ConsultaProcessosResponseData[];
}
