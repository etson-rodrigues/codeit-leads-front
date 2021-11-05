import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  setCookie(cookieName: string, cookieValue: any, expires: number) {
    let expiresDate = "max-age=" + expires * 60 + ';';

    document.cookie = cookieName + "=" + cookieValue + "; " + "path=/;" + expiresDate;
  }

  getCookie(cookieName: string) {
    let cookies = document.cookie;
    let prefix = cookieName + "=";
    let begin = cookies.indexOf("; " + prefix);

    if (begin == -1) {
      begin = cookies.indexOf(prefix);
      if (begin != 0) {
        return null;
      }
    } else {
      begin += 2;
    }

    let end = cookies.indexOf(";", begin);

    if (end == -1) {
      end = cookies.length;
    }
    return unescape(cookies.substring(begin + prefix.length, end));
  }

  deleteCookie(cookieName: string) {
    if (this.getCookie(cookieName)) {
      document.cookie = cookieName + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
  }
}