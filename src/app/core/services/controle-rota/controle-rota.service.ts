import { Injectable } from '@angular/core';

import { routes } from 'src/app/app-routing.module';
import { ChavesCookies } from '../../enums/cookie.enum';
import { ChavesLocalStorage } from '../../enums/local-storage.enum';
import { CookiesService } from '../cookies/cookies.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ControleRotaService {
    private _routes = routes;

    constructor(private _cookieService: CookiesService, private _localStorageService: LocalStorageService) {}

    public clearRouteData(routeUrl: string) {
        for (let route of this._routes) {
            if (`/${route.path}` === routeUrl) {
                if (routeUrl == '/login' || routeUrl == '/') {
                    this.clearData();
                }
            }
        }
    }

    public clearData() {
        this._cookieService.deleteCookie(ChavesCookies.Token);
        this._localStorageService.removeItemLocalStorage(ChavesLocalStorage.UserInfo);
    }
}
