import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ConsultaProcessosParameters } from '../../models/consulta-processos/consulta-processos-parameters.model';
import { ExportarProcessosRequest } from '../../models/consulta-processos/exportar-consulta-processos-request.model';
import { formatarDataParaRequest } from 'src/app/shared/utils/formatar-data';

@Injectable({
    providedIn: 'root'
})
export class ExportarProcessosService {
    private _url: string = environment.url;

    constructor(private _http: HttpClient) {}

    export(searchParameters: ConsultaProcessosParameters, isExportacaoComDetalhes: boolean) {
        let params: ExportarProcessosRequest = {
            dataFinal: formatarDataParaRequest(searchParameters.dataFinal)
        };

        if (searchParameters.dataInicial) {
            params = {
                ...params,
                dataInicial: formatarDataParaRequest(searchParameters.dataInicial)
            };
        }

        if (searchParameters.razaoSocialCnpj) {
            params = {
                ...params,
                razaoSocialCnpj: searchParameters.razaoSocialCnpj
            };
        }

        if (searchParameters.nup) {
            params = {
                ...params,
                nup: searchParameters.nup
            };
        }

        if (searchParameters.valorCausa) {
            params = {
                ...params,
                valorCausa: searchParameters.valorCausa
            };
        }

        if (searchParameters.criterioData) {
            params = {
                ...params,
                criterioData: searchParameters.criterioData
            };
        }

        if (searchParameters.tribunais && searchParameters.tribunais.length > 0) {
            params = {
                ...params,
                tribunais: searchParameters.tribunais
            };
        }

        if (searchParameters.uf) {
            params = {
                ...params,
                uf: searchParameters.uf
            };
        }
        
        if (isExportacaoComDetalhes) {
            params = {
                ...params,
                isExportacaoComDetalhes: isExportacaoComDetalhes
            };
        }

        return this._http.post(`${this._url}processos-judiciais/exportar`, params, { responseType: 'blob' });
    }
}
