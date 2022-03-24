import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

import { ChavesCookies } from '../../enums/cookie.enum';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service';
import { CookiesService } from '../../services/cookies/cookies.service';
import { MessageTrackerService } from '../../services/message-tracker/message-tracker.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() openMenu: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private _autenticacaoService: AutenticacaoService,
        private _cookieService: CookiesService,
        private _router: Router,
        private _spinnerService: NgxSpinnerService,
        private _messageTrackerService: MessageTrackerService
    ) {}

    ngOnInit(): void {}

    isUserLogged(): boolean {
        return this._cookieService.hasItemCookie(ChavesCookies.Token);
    }

    toggleSidenav() {
        this.openMenu.emit();
    }

    logout() {
        this._spinnerService.show();
        this._autenticacaoService
            .logout()
            .pipe(finalize(() => this._spinnerService.hide()))
            .subscribe({
                next: () => {
                    this._cookieService.deleteCookie(ChavesCookies.Token);
                    this._router.navigate(['login']);
                },
                error: (error) => {
                    this._messageTrackerService.subscribeError(error.error);
                }
            });
    }
}
