import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { ErrorData, ErrorDetail, ErrorResponse, Progress } from 'src/app/core/models/error-model';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';

@Component({
  selector: 'app-message-tracker',
  templateUrl: './message-tracker.component.html',
  styleUrls: ['./message-tracker.component.scss']
})
export class MessageTrackerComponent {

  public error!: ErrorResponse | undefined;
  @Output() loadError: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _timeOuts: any[] = [];

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ErrorData,
    public snackBarRef: MatSnackBarRef<MessageTrackerComponent>,
    private _messageTrackerService: MessageTrackerService) {
    this.intercept(data.error, data.progress);
  }

  public intercept(errorData: any, progress: Progress) {
    this.clearMessages();

    this.error = errorData;
    this.showMessage(progress);
  }

  public deleteError(error: ErrorDetail | string) {
    if (this.error) {
      let index = this.error.errors['ValidationsErrors'].findIndex((err: ErrorDetail) => err === error);

      if (this.error.errors['ValidationsErrors'].length == 1) {
        this._messageTrackerService.setLoadError(false);
        this.snackBarRef.dismiss();
      }

      this.error.errors['ValidationsErrors'].splice(index, 1);
    }
  }

  public clearMessages() {
    this.error = undefined;
  }

  public showMessage(progress: Progress) {
    switch (progress) {
      case 'asc':
        this._progressAscendente();
        break;
      case 'desc':
        this._progressDescendente();
        break;
      case 'default':
        this._progressDefault();
        break;
    }
  }

  public existError() {
    if (this.error && this.error.errors && this.error.errors['ValidationsErrors'] && this.error.errors['ValidationsErrors'].length > 0) {
      return true;
    }
    return false;
  }

  private _progressDefault() {
    this._show(100);
    this._hide();
  }

  private _progressAscendente() {
    this._show(0);
    this._hide(100);
  }

  private _progressDescendente() {
    this._show(100);
    this._hide(0);
  }

  private _show(initialPercent: number) {
    if (this.error && this.error.errors['ValidationsErrors'].length > 0) {
      this._timeOuts.push(setTimeout(() => {
        let errorElements: HTMLCollection = document.getElementsByClassName('progress-error');

        this._timeOuts.push(setTimeout(() => {
          for (let index = 0; errorElements.length > index; index++) {
            errorElements[index].setAttribute('style', `width: ${initialPercent}%;`);
          }
        }, 100));
      }, 0));
    } else {
      this._timeOuts.push(setTimeout(() => {
        (<HTMLElement>document.getElementById('progress-error')).setAttribute('style', `width: ${initialPercent}%;`);
      }, 0));
    }
  }

  private _hide(finalPercent?: number) {
    if ((this.error && this.error.errors['ValidationsErrors'].length > 0) && (finalPercent || (finalPercent! >= 0))) {
      this._timeOuts.push(setTimeout(() => {
        let errorElements: HTMLCollection = document.getElementsByClassName('progress-error')

        this._timeOuts.push(setTimeout(() => {
          for (let index = 0; errorElements.length > index; index++) {
            errorElements[index].setAttribute('style', `width: ${finalPercent}%;`);
          }
        }, 100));
      }, 1000));
    } else {
      this._timeOuts.push(setTimeout(() => {
        let message = (<HTMLElement>document.getElementById('message-error'));
        message.setAttribute('style', 'opacity: 0;');
      }, 12900));
    }
  }

  public defineIdError(errorId: number) {
    return `errorId${errorId}`;
  }
}
