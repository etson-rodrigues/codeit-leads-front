import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CadastroUsuarioRequest } from 'src/app/view/cadastros-gerais/gerenciamento-usuarios/steps/cadastro/cadastro.model';
import { CadastroUsuarioResponse } from '../../models/cadastro-usuario';

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuariosService {
  private _url: string = 'https://localhost:5001/api/';

  constructor(private _http: HttpClient) { }

  save(data: CadastroUsuarioRequest) {
    return this._http.post<CadastroUsuarioResponse>(`${this._url}usuarios`, data, { observe: 'response' });
  }
}
