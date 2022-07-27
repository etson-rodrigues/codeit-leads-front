import { CriterioData } from 'src/app/core/enums/criterio-data.enum';
import { SituacaoConsulta } from "../../enums/situacao-consulta.enum";
import { TipoConsulta } from "../../enums/tipo-consulta.enum";
import { HistoricoConsultasAnaliticoResponse } from "../../models/historico-consultas/historico-consultas-analitico-response.model";
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

export const mockHistoricoConsultasAnaliticoResponse: HistoricoConsultasAnaliticoResponse = {
    firstPage: 'https://localhost:5001/api/historico-consultas/analitico?pageNumber=1&pageSize=3',
    lastPage: 'https://localhost:5001/api/historico-consultas/analitico?pageNumber=4&pageSize=3',
    nextPage: 'https://localhost:5001/api/historico-consultas/analitico?pageNumber=2&pageSize=3',
    pageNumber: 1,
    pageSize: 3,
    previousPage: null,
    totalPages: 4,
    totalRecords: 10,
    data: [
        {
            dataConsulta: '',
            usuarioEmail: 'email@teste.com',
            razaoSocial: 'Razao Social Teste',
            nup: '',
            valorCausa: 10000,
            criterioData: CriterioData.UltimaAtualizacao,
            dataInicial: '',
            dataFinal: '2022-01-01T01:00:00',
            tribunais: '',
            uf: '',
            pagina: 1,
            tipoConsulta: TipoConsulta.Pesquisa,
            situacaoConsulta: SituacaoConsulta.Sucesso,
            quantidadeCreditos: 0.75,
            resultado: ''
        },
        {
            dataConsulta: '',
            usuarioEmail: 'email2@teste.com',
            razaoSocial: 'Razao Social Teste',
            nup: '',
            valorCausa: 50000,
            criterioData: CriterioData.UltimaAtualizacao,
            dataInicial: '',
            dataFinal: '2022-01-01T01:00:00',
            tribunais: '',
            uf: '',
            pagina: 1,
            tipoConsulta: TipoConsulta.Pesquisa,
            situacaoConsulta: SituacaoConsulta.Sucesso,
            quantidadeCreditos: 0.75,
            resultado: ''
        }
    ]
}