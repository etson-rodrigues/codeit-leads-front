import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumoService {

  constructor() { }

  @Output() getValues: EventEmitter<any> = new EventEmitter<any>();

  setValues(data: any) {
    this.getValues.emit(data);
  }
}
