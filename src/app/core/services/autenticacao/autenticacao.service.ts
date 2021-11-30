import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginRequest } from 'src/app/view/login/login.model';
import { Autenticacao, LoginResponse } from '../../models/autenticacao';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private _url: string = 'https://619f8da81ac52a0017ba48ed.mockapi.io/api/';
  private _loginInfo!: Autenticacao;
  isLoggedIn: boolean = false;
  redirectUrl: string | null = null;

  constructor(private _http: HttpClient) { }

  login(data: LoginRequest) {
    return this._http.post<LoginResponse>(`${this._url}login`, data, { observe: 'response' });
  }

  setLoginInfo(response: LoginResponse) {
    this._loginInfo = response.data;
  }

  getLoginInfo(){
    return this._loginInfo;
  }
}