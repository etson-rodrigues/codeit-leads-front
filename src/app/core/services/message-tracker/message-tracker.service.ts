import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { MessageTrackerComponent } from 'src/app/shared/components/message-tracker/message-tracker.component';
import { Progress } from '../../interfaces/components/error-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageTrackerService {

  private _configSuccess: MatSnackBarConfig = {
    panelClass: ["reset-snackbar"],
    duration: 13 * 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  private _loadError: boolean = false;

  constructor(private _snackBar: MatSnackBar) { }

  public subscribeError(error: any, progress: Progress = 'asc') {
    if (!this._loadError) {
      this.setLoadError(true);
      this._snackBar.openFromComponent(MessageTrackerComponent, {
        data: {
          error: error,
          progress: progress
        },
        ...this._configSuccess
      });
    }

    setTimeout(() => {
      this.setLoadError(false);
    }, 13000);
  }

  public setLoadError(isError: boolean) {
    this._loadError = isError;
  }
}