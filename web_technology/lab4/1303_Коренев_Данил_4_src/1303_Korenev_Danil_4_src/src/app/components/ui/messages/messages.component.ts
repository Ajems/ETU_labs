import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Message} from "../../../types/Message";
import {MessagesManagerService} from "../../../services/messagesManager/messages-manager.service";
import {ActivatedRoute} from "@angular/router";
import {MessageBaseInfoResponse} from "../../../types/response/messageBaseInfoResponse";
import {MessageResponse} from "../../../types/response/messageResponse";
import * as io from 'socket.io-client';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  @ViewChild('messagesList') messagesList!: ElementRef;
  senderId?: number
  companionId?: number
  ownerName?: string
  companionName?: string
  messages?: Message[]
  newMessage?: string;
  private socket: io.Socket;

  constructor(
    private messagesManager: MessagesManagerService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.socket = io.connect('https://localhost:443');
    this.renderer.listen('window', 'keydown.enter', (event) => {
      event.preventDefault();
      this.sendMessage()
    });
  }

  ngOnInit(): void {
    this.companionId = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (this.companionId === null || this.companionId === undefined) return
    this.initMessageWrapper()
    this.fillMessages()
    setTimeout(() => {
      this.scrollToBottom()
    }, 300)

    this.socket.on('new-message', (message) => {
      console.log("Client reacting for socket new message")
      if ((message.senderId === this.senderId) || (message.receiverId === this.senderId && message.senderId === this.companionId)){
        const isSender = this.senderId === message.senderId;
        const ownerName = isSender ? this.ownerName : this.companionName;
        const newMessage = new Message(
          message.senderId,
          message.receiverId,
          ownerName!,
          message.content,
          message.dateCreated
        )
        newMessage.alignRight = message.senderId === this.senderId
        this.messages?.push(newMessage)
        setTimeout(() => {
          this.scrollToBottom()
        }, 100)
      }
    })
  }

  scrollToBottom(){
    try {
      this.renderer.setProperty(this.messagesList.nativeElement, 'scrollTop', this.messagesList.nativeElement.scrollHeight);
      console.log("scroll to bottom")
    } catch(err) {
      console.log(err)
    }
  }

  initMessageWrapper() {
    this.messagesManager.getMessageBaseInfo(this.companionId!).subscribe({
      next: (messageBaseInfoResponse: MessageBaseInfoResponse) => {
        this.senderId = messageBaseInfoResponse.senderId
        this.companionId = messageBaseInfoResponse.companionId
        this.ownerName = messageBaseInfoResponse.ownerName
        this.companionName =messageBaseInfoResponse.companionName
        console.log(this.senderId, this.companionId, this.companionName)
      },
      error: err => {
        console.log(err)
      }
    })
  }


  sendMessage() {
    this.newMessage = this.newMessage?.trim()
    if (this.newMessage?.length === 0) return

    this.messagesManager.sendMessage(this.companionId!, this.newMessage!).subscribe({
      next: (message: Message) => {
        this.newMessage = ""
        this.socket.emit("send-message", message)
        this.scrollToBottom()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private fillMessages() {
    this.messagesManager.getDialogMessages(this.companionId!).subscribe({
      next: (messages: MessageResponse[]) => {
        this.messages = messages.map(messageResponse => {
          const isSender = this.senderId === messageResponse.senderId;
          const ownerName = isSender ? this.ownerName : this.companionName;

          const message = new Message(
            messageResponse.senderId,
            messageResponse.receiverId,
            ownerName!,
            messageResponse.content,
            messageResponse.dateCreated
          );
          message.alignRight = isSender
          return message
        })
        console.log(this.messages)
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
