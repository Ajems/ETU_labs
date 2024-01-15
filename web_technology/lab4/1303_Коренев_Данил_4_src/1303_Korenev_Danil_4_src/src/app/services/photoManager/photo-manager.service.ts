import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterResponse} from "../../types/response/registerResponse";
import {URLS} from "../../types/urls";

@Injectable({
  providedIn: 'root'
})
export class PhotoManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }


  public changeUserAvatar(photo: FormData): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient.post<boolean>(URLS.CHANGE_USER_AVATAR(), photo , {withCredentials: true})
        .subscribe({
          next: (result: boolean) => {
            observer.next(result)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }

  public loadUserAvatar(userId: number): Observable<Blob> {
    const options = {
      responseType: 'blob' as 'json',  // Устанавливаем тип ответа 'blob'
      withCredentials: true,
    };
    return new Observable<Blob>((observer) => {
      this.httpClient.get<Blob>(URLS.LOAD_USER_AVATAR(userId), options)
        .subscribe({
          next: (avatar: Blob) => {
            console.log("Service load photo")
            observer.next(avatar)
          },
          error: (err) => {
            console.log(`service error`)
            console.log(err)
            observer.error(err)
          }
        })
    })
  }
}
