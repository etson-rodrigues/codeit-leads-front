import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../models/login/login-request.model';
import { LoginResponse } from '../../models/login/login-response.model';
import { LogoutResponse } from '../../models/logout/logout-response.model';

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) {}

    login(data: LoginRequest) {
        return this._http.post<LoginResponse>(`${this._url}login`, data);
    }

    logout() {
        return this._http.post<LogoutResponse>(`${this._url}logout`, null);
    }
}
