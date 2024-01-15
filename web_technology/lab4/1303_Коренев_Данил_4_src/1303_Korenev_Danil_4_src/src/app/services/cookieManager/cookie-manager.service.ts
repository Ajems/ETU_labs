import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {

  constructor(
    private cookieService: CookieService
  ) { }

  public setCookie(name: string, value: string) {

    this.cookieService.set(name, value, undefined, '/', undefined, true, "None");
  }

  public getCookie(name: string): string | null {
    return this.cookieService.get(name);
  }

  public deleteCookie(name: string) {
    document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
