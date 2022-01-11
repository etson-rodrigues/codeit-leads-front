import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConsultaProcessosResponse } from '../../models/consulta-processos';

@Injectable({
  providedIn: 'root'
})
export class ConsultaProcessosService {
  private _url: string = 'https://localhost:5001/api/';
  private _urlMock: string = 'https://619f8da81ac52a0017ba48ed.mockapi.io/api/';

  constructor(private _http: HttpClient) { }

  get(razaoSocial: string, pageNumber: number, pageSize: number) {
    const params = new HttpParams()
      .set('razaoSocial', razaoSocial)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
    return this._http.get<ConsultaProcessosResponse>(`${this._url}processos-judiciais`, { params });
    //return this._http.get<ConsultaProcessosResponse>(`${this._urlMock}processos`);
  }
}
