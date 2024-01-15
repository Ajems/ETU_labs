import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterResponse} from "../../types/response/registerResponse";
import {URLS} from "../../types/urls";

@Injectable({
  providedIn: 'root'
})
export class FriendsManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  sendFriendRequest(friendId: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient.post<boolean>(URLS.SEND_FRIEND_REQUEST(), { friendId: friendId} , {withCredentials: true})
        .subscribe({
          next: (success: boolean) => {
            observer.next(success)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }

  removeUserFriend(friendId: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient.post<boolean>(URLS.REMOVE_USER_FRIEND(), { friendId: friendId} , {withCredentials: true})
        .subscribe({
          next: (success: boolean) => {
            observer.next(success)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }
}
