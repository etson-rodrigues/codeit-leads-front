import { Injectable } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Event } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(
    private _router: Router,
    private _spinner: NgxSpinnerService) { }

  subscribe(): void {
    this._router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this._spinner.show();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this._spinner.hide();
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
