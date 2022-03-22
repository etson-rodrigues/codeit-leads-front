import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { DetalhesProcessoResponse } from '../../models/detalhes-processo/detalhes-processo-response.model';

@Injectable({
    providedIn: 'root'
})
export class DetalhesProcessoService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) {}

    get(nup: string) {
        let params = new HttpParams().set('nup', nup);
        return this._http.get<DetalhesProcessoResponse>(`${this._url}detalhes-processo`, { params });
    }
}
