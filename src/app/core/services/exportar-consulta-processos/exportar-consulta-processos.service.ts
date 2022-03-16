import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ConsultaProcessosRequest } from '../../models/consulta-processos/consulta-processos-request.model';
import { ExportarConsultaProcessosRequest } from '../../models/consulta-processos/exportar-consulta-processos-request.model';
import { formatarDataParaRequest } from 'src/app/shared/utils/formatar-data';

@Injectable({
  providedIn: 'root'
})
export class ExportarConsultaProcessosService {
  private _url: string = environment.url;

  constructor(private _http: HttpClient) { }

  export(searchParameters: ConsultaProcessosRequest) {

    let params: ExportarConsultaProcessosRequest = {
      razaoSocial: searchParameters.razaoSocial,
      dataFinal: formatarDataParaRequest(searchParameters.dataFinal)
    };

    if (searchParameters.criterioData) {
      params = {
        ...params,
        criterioData: searchParameters.criterioData
      }
    }

    if (searchParameters.dataInicial) {
      params = {
        ...params,
        dataInicial: formatarDataParaRequest(searchParameters.dataInicial)
      }
    }

    return this._http.post(`${this._url}processos-judiciais/exportar`, params, { responseType: 'blob' });
  }
}
