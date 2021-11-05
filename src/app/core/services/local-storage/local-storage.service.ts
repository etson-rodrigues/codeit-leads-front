import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  hasItemLocalStorage(key: string = 'accessToken') {
    return !!this.getItemLocalStorage(key);
  }

  getItemLocalStorage(key: string = 'accessToken') {
    return window.localStorage.getItem(key);
  }

  setItemLocalStorage(token: string, key: string = 'accessToken') {
    window.localStorage.setItem(key, token);
  }

  removeItemLocalStorage(key: string = 'accessToken') {
    window.localStorage.removeItem(key);
  }

  clearLocalStorage() {
    window.localStorage.clear();
  }
}