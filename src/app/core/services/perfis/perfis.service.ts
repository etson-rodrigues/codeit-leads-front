import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PerfisListResponse } from '../../models/perfil/perfil-response.model';

@Injectable({
    providedIn: 'root'
})
export class PerfisService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) {}

    getPerfis() {
        return this._http.get<PerfisListResponse>(`${this._url}perfis`);
    }
}
