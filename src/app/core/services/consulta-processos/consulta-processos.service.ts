import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ConsultaProcessosRequest } from '../../models/consulta-processos/consulta-processos-request.model';
import { ConsultaProcessosResponse } from '../../models/consulta-processos/consulta-processos-response.model';
import { formatarDataParaRequest } from 'src/app/shared/utils/formatar-data';

@Injectable({
    providedIn: 'root'
})
export class ConsultaProcessosService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) {}

    get(searchParameters: ConsultaProcessosRequest, pageNumber: number, pageSize: number) {
        let params = new HttpParams().set('razaoSocial', searchParameters.razaoSocial);

        if (searchParameters.criterioData) {
            params = params.set('criterioData', searchParameters.criterioData);
        }
        if (searchParameters.dataInicial) {
            params = params.set('dataInicial', formatarDataParaRequest(searchParameters.dataInicial));
        }

        params = params.set('dataFinal', formatarDataParaRequest(searchParameters.dataFinal)).set('pageNumber', pageNumber).set('pageSize', pageSize);

        return this._http.get<ConsultaProcessosResponse>(`${this._url}processos-judiciais`, { params });
    }
}
