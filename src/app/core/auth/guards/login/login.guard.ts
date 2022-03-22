import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ChavesCookies } from 'src/app/core/enums/cookie.enum';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private _cookieService: CookiesService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._cookieService.hasItemCookie(ChavesCookies.Token)) {
            this._router.navigate(['processos-judiciais/consulta-geral']);
            return false;
        }
        return true;
    }
}
