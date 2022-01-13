import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AutenticacaoService } from './core/services/autenticacao/autenticacao.service';

import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gerador-leads';
  currentUrl: string = '';
  isSidenavOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private _themeService: ThemeService,
    public router: Router,
    private _autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this._themeService.initThemes();
    this.getCurrentRoute();
  }

  getCurrentRoute() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url;
        }
      }
    );
  }

  handleUserLogin() {
    if ((this.currentUrl === '/login' || this.currentUrl === '/redefinir-senha' || this.currentUrl === '/')) {
      this.isSidenavOpen = false;
      return this.isLoggedIn = false;
    }
    this.isLoggedIn = this._autenticacaoService.isLoggedIn;
    return this.isLoggedIn;
  }

  handleOpenMenu() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
