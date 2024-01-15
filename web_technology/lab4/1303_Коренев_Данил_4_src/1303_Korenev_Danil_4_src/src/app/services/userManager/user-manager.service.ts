import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetNewsResponse} from "../../types/response/getNewsResponse";
import {URLS} from "../../types/urls";
import {UserInfoResponse} from "../../types/response/userInfoResponse";

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getSelfInfo(): Observable<UserInfoResponse> {
    return new Observable<UserInfoResponse>((observer) => {
      this.httpClient.get<UserInfoResponse>(URLS.FULL_SELF_INFO(), {withCredentials: true})
        .subscribe({
          next: (userInfoResponse: UserInfoResponse) => {
            observer.next(userInfoResponse)
          },
          error: (err) => {
            observer.error(err.error.message)
          }
        })
    })
  }

  public getUserInfo(id: number): Observable<UserInfoResponse> {
    return new Observable<UserInfoResponse>((observer) => {
      this.httpClient.get<UserInfoResponse>(URLS.FULL_USER_INFO(id), {withCredentials: true})
        .subscribe({
          next: (userInfoResponse: UserInfoResponse) => {
            observer.next(userInfoResponse)
          },
          error: (err) => {
            observer.error(err.error.message)
          }
        })
    })
  }

  public getIsUserFriend(userId: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient.get<boolean>(URLS.IS_USER_FRIEND(userId), {withCredentials: true})
        .subscribe({
          next: (isFriend: boolean) => {
            observer.next(isFriend)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }

  public getSelfId(): Observable<number> {
    return new Observable<number>((observer) => {
      this.httpClient.get<number>(URLS.SELF_USER_ID(), {withCredentials: true})
        .subscribe({
          next: (id: number) => {
            observer.next(id)
          },
          error: (err) => {
            observer.error(err.error.message)
          }
        })
    })
  }

  public isAdmin(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient.get<boolean>(URLS.IS_USER_ADMIN(), {withCredentials: true})
        .subscribe({
          next: (isAdmin: boolean) => {
            observer.next(isAdmin)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }
}
