import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResumoService {
    constructor() {}

    @Output() getValues: EventEmitter<any> = new EventEmitter<any>();
    @Output() getIsEditing: EventEmitter<any> = new EventEmitter<any>();

    setValues(userData: any, isEditing: boolean) {
        this.getValues.emit(userData.data);
        this.getIsEditing.emit(isEditing);
    }
}
