import { SituacaoConsulta } from "../../enums/situacao-consulta.enum";
import { TipoConsulta } from "../../enums/tipo-consulta.enum";
import { HistoricoConsultasSinteticoResponse } from "../../models/historico-consultas/historico-consultas-sintetico-response.model";

export const mockHistoricoConsultasSinteticoResponse: HistoricoConsultasSinteticoResponse = {
    firstPage: 'https://localhost:5001/api/historico-consultas/sintetico?pageNumber=1&pageSize=3',
    lastPage: 'https://localhost:5001/api/historico-consultas/sintetico?pageNumber=4&pageSize=3',
    nextPage: 'https://localhost:5001/api/historico-consultas/sintetico?pageNumber=2&pageSize=3',
    pageNumber: 1,
    pageSize: 3,
    previousPage: null,
    totalPages: 4,
    totalRecords: 10,
    data: [
        {
            usuarioEmail: 'email@teste.com',
            tipoConsulta: TipoConsulta.Pesquisa,
            situacaoConsulta: SituacaoConsulta.Sucesso,
            totalConsultas: 5,
            quantidadeTotalCreditos: 3.75
        },
        {
            usuarioEmail: 'email2@teste.com',
            tipoConsulta: TipoConsulta.Pesquisa,
            situacaoConsulta: SituacaoConsulta.Sucesso,
            totalConsultas: 1,
            quantidadeTotalCreditos: 0.75
        },
        {
            usuarioEmail: 'email3@teste.com',
            tipoConsulta: TipoConsulta.Pesquisa,
            situacaoConsulta: SituacaoConsulta.Sucesso,
            totalConsultas: 2,
            quantidadeTotalCreditos: 1.50
        }
    ]
}