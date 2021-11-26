import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/view/login/login.model';
import { LoginResponse } from '../../models/autenticacao';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private _url: string = 'https://619f8da81ac52a0017ba48ed.mockapi.io/api/';

  constructor(private _http: HttpClient) { }

  login(data: LoginRequest) {
    return this._http.post<LoginResponse>(`${this._url}login`, data, { observe: 'response' });
  }
}