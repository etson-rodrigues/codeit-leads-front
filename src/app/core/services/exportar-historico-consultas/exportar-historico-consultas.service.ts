import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { formatarDataParaRequest } from 'src/app/shared/utils/formatar-data';
import { HistoricoConsultasRequest } from '../../models/historico-consultas/historio-consultas-request.model';
import { ExportarHistoricoConsultasRequest } from '../../models/historico-consultas/exportar-historico-consultas-request.model';

@Injectable({
    providedIn: 'root'
})
export class ExportarHistoricoConsultasService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) { }

    exportSintetico(searchParameters: HistoricoConsultasRequest) {
        let params: ExportarHistoricoConsultasRequest = {
            dataFinal: formatarDataParaRequest(searchParameters.dataFinal)
        };

        if (searchParameters.dataInicial) {
            params = {
                ...params,
                dataInicial: formatarDataParaRequest(searchParameters.dataInicial)
            };
        }

        if (searchParameters.usuarioEmail) {
            params = {
                ...params,
                usuarioEmail: searchParameters.usuarioEmail
            };
        }

        if (searchParameters.tipoConsulta) {
            params = {
                ...params,
                tipoConsulta: searchParameters.tipoConsulta
            };
        }

        if (searchParameters.situacaoConsulta) {
            params = {
                ...params,
                situacaoConsulta: searchParameters.situacaoConsulta
            };
        }
        
        return this._http.post(`${this._url}historico-consultas/exportar/sintetico`, params, { responseType: 'blob' });
    }

    exportAnalitico(searchParameters: HistoricoConsultasRequest) {
        let params: ExportarHistoricoConsultasRequest = {
            dataFinal: formatarDataParaRequest(searchParameters.dataFinal)
        };

        if (searchParameters.dataInicial) {
            params = {
                ...params,
                dataInicial: formatarDataParaRequest(searchParameters.dataInicial)
            };
        }

        if (searchParameters.usuarioEmail) {
            params = {
                ...params,
                usuarioEmail: searchParameters.usuarioEmail
            };
        }

        if (searchParameters.tipoConsulta) {
            params = {
                ...params,
                tipoConsulta: searchParameters.tipoConsulta
            };
        }

        if (searchParameters.situacaoConsulta) {
            params = {
                ...params,
                situacaoConsulta: searchParameters.situacaoConsulta
            };
        }
        
        return this._http.post(`${this._url}historico-consultas/exportar/analitico`, params, { responseType: 'blob' });
    }
}
