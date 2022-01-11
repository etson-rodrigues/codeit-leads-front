import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditarService {

  constructor() { }

  @Output() getValues: EventEmitter<any> = new EventEmitter<any>();

  setValues(data: any) {
    this.getValues.emit(data);
  }
}