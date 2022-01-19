import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";

import { environment } from "src/environments/environment";
import { ChavesCookies } from "../enums/cookie.enum";
import { ChavesLocalStorage } from "../enums/local-storage.enum";
import { CookiesService } from "../services/cookies/cookies.service";
import { LocalStorageService } from "../services/local-storage/local-storage.service";
import { MessageTrackerService } from "../services/message-tracker/message-tracker.service";


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private _url: string = environment.url;

  constructor(
    private _cookieService: CookiesService,
    private _localStorageService: LocalStorageService,
    private _messageTrackerService: MessageTrackerService,
    private _router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._cookieService.hasItemCookie(ChavesCookies.Token)) {
      if (!req.url.indexOf(this._url)) {
        const token = this._cookieService.getCookie(ChavesCookies.Token);
        req = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      return next.handle(req).pipe(catchError(error => this.handleAuthError(error)));
    }
    return next.handle(req).pipe(catchError(error => this.handleAuthError(error)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 || error.status === 403) {
      this._cookieService.deleteCookie(ChavesCookies.Token);
      this._localStorageService.removeItemLocalStorage(ChavesLocalStorage.UserInfo);
      this._router.navigate(['login']);
      return of(error.status);
    }
    this._messageTrackerService.subscribeError(error.error);
    return throwError(() => new Error(error.status.toString()));
  }
}