import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URLS} from "../../types/urls";
import {UserInfoResponse} from "../../types/response/userInfoResponse";

@Injectable({
  providedIn: 'root'
})
export class UsersListManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFriendsList(userId: number): Observable<UserInfoResponse[]> {
    return new Observable<UserInfoResponse[]>((observer) => {
      this.httpClient.get<UserInfoResponse[]>(URLS.FRIENDS_LIST(userId), {withCredentials: true})
        .subscribe({
          next: (friendsList: UserInfoResponse[]) => {
            observer.next(friendsList)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }
}

