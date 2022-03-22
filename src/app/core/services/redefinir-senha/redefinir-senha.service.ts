import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CadastroUsuarioResponse } from '../../models/gerenciamento-usuarios/cadastro-usuario-response.model';
import { RedefinirSenhaRequest } from '../../models/redefinir-senha/redefinir-senha-request.model';

@Injectable({
    providedIn: 'root'
})
export class RedefinirSenhaService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) {}

    redefinePassword(id: number, novaSenha: string) {
        const data: RedefinirSenhaRequest = {
            novaSenha
        };
        return this._http.put<CadastroUsuarioResponse>(`${this._url}usuarios/${id}/redefinir-senha`, data);
    }
}
