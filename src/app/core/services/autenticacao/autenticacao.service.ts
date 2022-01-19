import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginRequest } from 'src/app/view/login/login.model';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../../models/autenticacao';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private _url: string = environment.url;

  constructor(private _http: HttpClient) { }

  login(data: LoginRequest) {
    return this._http.post<LoginResponse>(`${this._url}login`, data);
  }
}