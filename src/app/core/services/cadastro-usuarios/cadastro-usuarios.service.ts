import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CadastroUsuarioRequest } from 'src/app/view/cadastros-gerais/gerenciamento-usuarios/steps/cadastro/cadastro.model';
import { environment } from 'src/environments/environment';
import { AtualizarStatusCadastroUsuario, CadastroUsuarioResponse, ConsultaUsuarioPaginateResponse } from '../../models/gerenciamento-usuarios';

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuariosService {
  private _url: string = environment.url;

  constructor(private _http: HttpClient) { }

  save(data: CadastroUsuarioRequest, isEditing: boolean, id: number) {
    if (isEditing) {
      return this._http.put<CadastroUsuarioResponse>(`${this._url}usuarios/${id}`, data);
    }
    return this._http.post<CadastroUsuarioResponse>(`${this._url}usuarios`, data);
  }

  updateStatus(data: AtualizarStatusCadastroUsuario) {
    const params = new HttpParams()
      .set('atualizarStatus', data.status);
    return this._http.put<CadastroUsuarioResponse>(`${this._url}usuarios/${data.id}/atualizar-status`, null, { params });
  }

  get(email: string, pageNumber: number, pageSize: number) {
    const params = new HttpParams()
      .set('email', email)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this._http.get<ConsultaUsuarioPaginateResponse>(`${this._url}usuarios`, { params });
  }
}
