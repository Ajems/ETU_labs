import { Injectable } from '@angular/core';
import {Post} from "../../types/post";
import {CookieManagerService} from "../cookieManager/cookie-manager.service";
import {HttpClient} from "@angular/common/http";
import {URLS} from "../../types/urls"
import {Observable} from "rxjs";
import {GetNewsResponse} from "../../types/response/getNewsResponse";
import {RegisterResponse} from "../../types/response/registerResponse";
import {AddPostResponse} from "../../types/response/AddPostResponse";

@Injectable({
  providedIn: 'root'
})
export class NewsManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getNewsFeed(): Observable<Post[]> {
    return new Observable<Post[]>((observer) => {
      this.httpClient.get<Post[]>(URLS.NEWS_FEED(), {withCredentials: true})
        .subscribe({
          next: (postArray: Post[]) => {
            observer.next(postArray)
          },
          error: (err) => {
            observer.error(err.error.message)
          }
        })
    })
  }

  public getNews(id: number): Observable<Post[]> {
    return new Observable<Post[]>((observer) => {
      this.httpClient.get<Post[]>(URLS.NEWS_OF_USER(id), {withCredentials: true})
        .subscribe({
          next: (postArray: Post[]) => {
            observer.next(postArray)
          },
          error: (err) => {
            observer.error(err.error.message)
          }
        })
    })
  }

  public addUserPost(postContent: string): Observable<Post> {
    return new Observable<Post>((observer) => {
      this.httpClient.post<Post>(URLS.ADD_USER_POST(), { postContent }, {withCredentials: true})
        .subscribe({
          next: (response: Post) => {
            observer.next(response)
          },
          error: (err) => {
            observer.error(err.error.message)
          }
        })
    })
  }
}
