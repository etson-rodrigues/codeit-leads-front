import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ChavesCookies } from '../../../enums/cookie.enum';
import { ChavesLocalStorage } from '../../../enums/local-storage.enum';
import { Autenticacao } from '../../../models/autenticacao/autenticacao.model';
import { CookiesService } from '../../../services/cookies/cookies.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
    if (!redefinirSenha && this._cookieService.hasItemCookie(ChavesCookies.Token)) {
      return true;
    }
    this._cookieService.deleteCookie(ChavesCookies.Token);
    this._router.navigate(['login']);
    return false;
  }
}