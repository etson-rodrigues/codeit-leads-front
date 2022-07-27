import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { formatarDataParaRequest } from 'src/app/shared/utils/formatar-data';
import { HistoricoConsultasRequest } from '../../models/historico-consultas/historio-consultas-request.model';
import { HistoricoConsultasSinteticoResponse } from '../../models/historico-consultas/historico-consultas-sintetico-response.model';
import { HistoricoConsultasAnaliticoResponse } from '../../models/historico-consultas/historico-consultas-analitico-response.model';
import { AbstractResponse } from '../../models/comum/abstract-response';

@Injectable({
    providedIn: 'root'
})
export class HistoricoConsultasService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) {}

    getSinteticoBy(searchParameters: HistoricoConsultasRequest, pageNumber: number, pageSize: number) {
        let params = new HttpParams().set('dataFinal', formatarDataParaRequest(searchParameters.dataFinal));

        if (searchParameters.dataInicial) {
          params = params.set('dataInicial', formatarDataParaRequest(searchParameters.dataInicial));
        }
        if (searchParameters.usuarioEmail) {
          params = params.set('usuarioEmail', searchParameters.usuarioEmail);
        }
        if (searchParameters.tipoConsulta) {
            params = params.set('tipoConsulta', searchParameters.tipoConsulta);
        }
        if (searchParameters.situacaoConsulta) {
          params = params.set('situacaoConsulta', searchParameters.situacaoConsulta);
        }       

        params = params.set('pageNumber', pageNumber).set('pageSize', pageSize);

        return this._http.get<HistoricoConsultasSinteticoResponse>(`${this._url}historico-consultas/sintetico`, { params });
    }

    getAnaliticoBy(searchParameters: HistoricoConsultasRequest, pageNumber: number, pageSize: number) {
      let params = new HttpParams().set('dataFinal', formatarDataParaRequest(searchParameters.dataFinal));

      if (searchParameters.dataInicial) {
        params = params.set('dataInicial', formatarDataParaRequest(searchParameters.dataInicial));
      }
      if (searchParameters.usuarioEmail) {
        params = params.set('usuarioEmail', searchParameters.usuarioEmail);
      }
      if (searchParameters.tipoConsulta) {
          params = params.set('tipoConsulta', searchParameters.tipoConsulta);
      }
      if (searchParameters.situacaoConsulta) {
        params = params.set('situacaoConsulta', searchParameters.situacaoConsulta);
      }       

      params = params.set('pageNumber', pageNumber).set('pageSize', pageSize);

      return this._http.get<HistoricoConsultasAnaliticoResponse>(`${this._url}historico-consultas/analitico`, { params });
  }

    getSaldoDisponivel(email: string) {
      let params = new HttpParams().set('usuarioEmail', formatarDataParaRequest(email));

      return this._http.get<AbstractResponse<number>>(`${this._url}historico-consultas/saldo-disponivel`, { params });
    }
}
