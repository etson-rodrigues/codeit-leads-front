import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AlteracaoUsuarioRequest } from '../../models/gerenciamento-usuarios/alteracao-usuario-request.model';
import { CadastroUsuarioRequest } from '../../models/gerenciamento-usuarios/cadastro-usuario-request.model';
import { CadastroUsuarioResponse } from '../../models/gerenciamento-usuarios/cadastro-usuario-response.model';
import { ConsultaUsuarioResponse } from '../../models/gerenciamento-usuarios/consulta-usuario-response.model';

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

    updateStatus(data: AlteracaoUsuarioRequest) {
        const params = new HttpParams().set('atualizarStatus', data.ativo);
        return this._http.put<CadastroUsuarioResponse>(`${this._url}usuarios/${data.id}/atualizar-status`, null, { params });
    }

    get(email: string, pageNumber: number, pageSize: number) {
        const params = new HttpParams().set('email', email).set('pageNumber', pageNumber).set('pageSize', pageSize);
        return this._http.get<ConsultaUsuarioResponse>(`${this._url}usuarios`, { params });
    }

    getAll() {
        const params = new HttpParams().set('email', "");
        return this._http.get<ConsultaUsuarioResponse>(`${this._url}usuarios`, { params });
    }
}
