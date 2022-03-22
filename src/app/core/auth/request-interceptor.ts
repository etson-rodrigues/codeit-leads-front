import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CookiesService } from '../services/cookies/cookies.service';
import { ChavesCookies } from '../enums/cookie.enum';
import { Error } from '../enums/error';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    private _url: string = environment.url;

    constructor(private _cookieService: CookiesService, private _router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._cookieService.hasItemCookie(ChavesCookies.Token)) {
            if (!req.url.indexOf(this._url)) {
                const token = this._cookieService.getCookie(ChavesCookies.Token);
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            return next.handle(req).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (req.responseType === 'blob' && error.error instanceof Blob) {
                        return from(
                            Promise.resolve(error).then(async (x) => {
                                throw new HttpErrorResponse({ error: JSON.parse(await x.error.text()), headers: x.headers, status: x.status, statusText: x.statusText, url: x.url ?? undefined });
                            })
                        );
                    }
                    return this.handleAuthError(error);
                })
            );
        }
        return next.handle(req).pipe(catchError((error) => this.handleAuthError(error)));
    }

    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        switch (error.status) {
            case Error.Unauthorized:
                this._router.navigate(['login']);
                return throwError(() => error);
            case Error.Forbidden:
                this._router.navigate(['pagina-nao-encontrada']);
                return throwError(() => error);
            case Error.NotFound:
                this._router.navigate(['pagina-nao-encontrada']);
                return throwError(() => error);
            default:
                return throwError(() => error);
        }
    }
}
