import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ConsultaProcessosParameters } from '../../models/consulta-processos/consulta-processos-parameters.model';
import { ConsultaProcessosRequest } from '../../models/consulta-processos/consulta-processos-request.model';
import { ConsultaProcessosResponse } from '../../models/consulta-processos/consulta-processos-response.model';
import { formatarDataParaRequest } from 'src/app/shared/utils/formatar-data';

@Injectable({
    providedIn: 'root'
})
export class ConsultaProcessosService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) {}    

    post(searchParameters: ConsultaProcessosParameters, pageNumber: number, pageSize: number) {
        let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);

        let bodyParams: ConsultaProcessosRequest = {
            dataFinal: formatarDataParaRequest(searchParameters.dataFinal)
        };

        if (searchParameters.dataInicial) {
            bodyParams = {
                ...bodyParams,
                dataInicial: formatarDataParaRequest(searchParameters.dataInicial)
            };
        }

        if (searchParameters.razaoSocialCnpj) {
            bodyParams = {
                ...bodyParams,
                razaoSocialCnpj: searchParameters.razaoSocialCnpj
            };
        }

        if (searchParameters.nup) {
            bodyParams = {
                ...bodyParams,
                nup: searchParameters.nup
            };
        }

        if (searchParameters.valorCausa) {
            bodyParams = {
                ...bodyParams,
                valorCausa: searchParameters.valorCausa
            };
        }

        if (searchParameters.criterioData) {
            bodyParams = {
                ...bodyParams,
                criterioData: searchParameters.criterioData
            };
        }

        if (searchParameters.tribunais && searchParameters.tribunais.length > 0) {
            bodyParams = {
                ...bodyParams,
                tribunais: searchParameters.tribunais
            };
        }

        if (searchParameters.uf) {
            bodyParams = {
                ...bodyParams,
                uf: searchParameters.uf
            };
        }

        return this._http.post<ConsultaProcessosResponse>(`${this._url}processos-judiciais`, bodyParams, { params });
    }
}
