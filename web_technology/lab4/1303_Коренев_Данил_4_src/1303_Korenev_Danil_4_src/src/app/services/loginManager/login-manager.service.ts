import {Injectable, numberAttribute} from '@angular/core';
import {CookieManagerService} from "../cookieManager/cookie-manager.service";
import {HttpClient} from "@angular/common/http";
import {URLS} from "../../types/urls";
import {LoginResponse} from "../../types/response/loginResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {
  constructor(
      private cookieManager: CookieManagerService,
      private httpClient: HttpClient
  ) {
  }

  public tryLogin(email: string, password: string): Observable<LoginResponse> {
    return new Observable<LoginResponse>((observer) => {
      this.httpClient.post<LoginResponse>(URLS.LOGIN(), {email: email, password: password}, {withCredentials: true})
        .subscribe({
          next: (loginResponse: LoginResponse) => {
            observer.next(loginResponse)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }

  public saveToken(token: string) {
    console.log("token save ", token)
    this.cookieManager.setCookie('token', token);
    console.log(this.cookieManager.getCookie('token'))
  }

}
