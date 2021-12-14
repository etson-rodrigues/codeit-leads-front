import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PerfisListResponse } from '../../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfisService {
  private _url: string = 'https://localhost:5001/api/';

  constructor(private _http: HttpClient) { }

  getPerfis() {
    return this._http.get<PerfisListResponse>(`${this._url}perfis`);
  }
}
