import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ChavesCookies } from './core/enums/cookie.enum';
import { ControleRotaService } from './core/services/controle-rota/controle-rota.service';
import { CookiesService } from './core/services/cookies/cookies.service';
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
    private _cookieService: CookiesService
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
    if (this._cookieService.hasItemCookie(ChavesCookies.Token) && (this.currentUrl != '/login' && this.currentUrl != '' && this.currentUrl != '/redefinir-senha')) {
      return true;
    }
    return false;
  }

  handleOpenMenu() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}