import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {URLS} from "../../types/urls";
import {HttpClient} from "@angular/common/http";
import {MessageBaseInfoResponse} from "../../types/response/messageBaseInfoResponse";
import {Message} from "../../types/Message";
import {MessageResponse} from "../../types/response/messageResponse";

@Injectable({
  providedIn: 'root'
})
export class MessagesManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMessageBaseInfo(companionId: number): Observable<MessageBaseInfoResponse> {
    return new Observable<MessageBaseInfoResponse>((observer) => {
      this.httpClient.get<MessageBaseInfoResponse>(URLS.MESSAGE_BASE_INFO(companionId), {withCredentials: true})
        .subscribe({
          next: (info: MessageBaseInfoResponse) => {
            observer.next(info)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }

  public getDialogMessages(companionId: number): Observable<MessageResponse[]> {
    return new Observable<MessageResponse[]>((observer) => {
      this.httpClient.get<MessageResponse[]>(URLS.GET_DIALOG_MESSAGES(companionId), {withCredentials: true})
        .subscribe({
          next: (messages: MessageResponse[]) => {
            observer.next(messages)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }

  public sendMessage(companionId: number, content: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.httpClient.post<any>(URLS.SEND_MESSAGE(companionId), {content: content}, {withCredentials: true})
        .subscribe({
          next: (response: any) => {
            observer.next(response)
          },
          error: (err) => {
            observer.error(err)
          }
        })
    })
  }

}
