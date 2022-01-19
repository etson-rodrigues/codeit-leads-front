import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ChavesCookies } from './core/enums/cookie.enum';
import { ChavesLocalStorage } from './core/enums/local-storage.enum';
import { Autenticacao } from './core/models/autenticacao';
import { ControleRotaService } from './core/services/controle-rota/controle-rota.service';
import { CookiesService } from './core/services/cookies/cookies.service';
import { LocalStorageService } from './core/services/local-storage/local-storage.service';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSidenavOpen: boolean = false;
  currentUrl: string = '';

  constructor(
    private _themeService: ThemeService,
    private _router: Router,
    private _controleRotaService: ControleRotaService,
    private _cookieService: CookiesService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this._themeService.initThemes();
    this.getCurrentRoute();
  }

  getCurrentRoute() {
    this._router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url;
          this._controleRotaService.clearRouteData(event.url);
        }
      }
    );
  }

  handleUserLogin() {
    const userInfo: Autenticacao = JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}');
    const redefinirSenha: boolean = userInfo.redefinirSenha;
    if (!redefinirSenha && this._cookieService.hasItemCookie(ChavesCookies.Token) && this.currentUrl != '/redefinir-senha') {
      return true;
    }
    return false;
  }

  handleOpenMenu() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}