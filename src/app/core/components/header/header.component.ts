import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ChavesCookies } from '../../enums/cookie.enum';
import { CookiesService } from '../../services/cookies/cookies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openMenu: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private _cookieService: CookiesService,
    private _router: Router
  ) { }

  ngOnInit(): void { }

  toggleSidenav() {
    this.openMenu.emit();
  }

  logout() {
    this._cookieService.deleteCookie(ChavesCookies.Token);
    this._router.navigate(['login']);
  }
}