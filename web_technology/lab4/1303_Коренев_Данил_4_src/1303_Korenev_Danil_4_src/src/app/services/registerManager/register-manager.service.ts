import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LoginResponse} from "../../types/response/loginResponse";
import {RegisterResponse} from "../../types/response/registerResponse";
import {URLS} from "../../types/urls";
import {HttpClient} from "@angular/common/http";
import {UserData} from "../../types/userData";

@Injectable({
  providedIn: 'root'
})
export class RegisterManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public tryRegister(userData: UserData): Observable<RegisterResponse> {
    return new Observable<RegisterResponse>((observer) => {
      this.httpClient.post<RegisterResponse>(URLS.REGISTER(), userData, {withCredentials: true})
        .subscribe({
          next: (registerResponse: RegisterResponse) => {
            observer.next(registerResponse)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }
}
