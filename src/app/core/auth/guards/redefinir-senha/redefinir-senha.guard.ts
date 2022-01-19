import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ChavesCookies } from 'src/app/core/enums/cookie.enum';
import { ChavesLocalStorage } from 'src/app/core/enums/local-storage.enum';
import { Autenticacao } from 'src/app/core/models/autenticacao';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RedefinirSenhaGuard implements CanActivate {

  constructor(
    private _cookieService: CookiesService,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userInfo: Autenticacao = JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}');
    const redefinirSenha: boolean = userInfo.redefinirSenha;
    if (redefinirSenha) {
      return true;
    }
    if (this._cookieService.hasItemCookie(ChavesCookies.Token)) {
      this._router.navigate(['processos-judiciais/consulta-geral']);
      return false;
    }
    this._router.navigate(['login']);
    return false;
  }

}