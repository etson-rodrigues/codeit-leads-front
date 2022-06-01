import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AcoesSeguranca } from 'src/app/core/enums/acoes-seguranca.enum';
import { ChavesLocalStorage } from 'src/app/core/enums/local-storage.enum';
import { Autenticacao } from 'src/app/core/models/autenticacao/autenticacao.model';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';

@Injectable({
    providedIn: 'root'
})
export class HistoricoConsultasGuard implements CanActivate {
    constructor(
        private _cadastroUsuariosService: CadastroUsuariosService,
        private _localStorageService: LocalStorageService,
        private _messageTrackerService: MessageTrackerService,
        private _router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Observable<boolean>((obs) => {
            const userInfo: Autenticacao = JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}');
            this._cadastroUsuariosService.get(userInfo.email, 1, 10).subscribe({
                next: (response) => {
                    if (!!response.data[0].perfil.acoesSeguranca.find((acao) => acao.acaoSeguranca.codigo == AcoesSeguranca.HistoricoConsultas)) {
                        obs.next(true);
                        return;
                    }
                    this._router.navigate(['processos-judiciais/consulta-geral']);
                    obs.next(false);
                },
                error: (error) => {
                    this._messageTrackerService.subscribeError(error.error);
                }
            });
        });
    }
}
