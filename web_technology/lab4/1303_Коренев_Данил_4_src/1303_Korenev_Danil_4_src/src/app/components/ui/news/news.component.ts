import {Component, Host, Input, OnInit} from '@angular/core';
import {Post} from "../../../types/post";
import {NewsManagerService} from "../../../services/newsManager/news-manager.service";
import {UserManagerService} from "../../../services/userManager/user-manager.service";
import * as io from "socket.io-client";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() userId?: number
  @Input() parentComponent?: string
  public newsList: Post[] = []
  private socket: io.Socket;

  constructor(
    private newsManager: NewsManagerService,
    private userManager: UserManagerService
  ) {
    this.socket = io.connect('https://localhost:443');
  }

  public ngOnInit() {
    this.getNewsFromServer()

    setTimeout(() => {
      this.socket.on('new-news', (post) => {
        if (this.userId === post.ownerId){ // на странице запостившего
          this.newsList.unshift(post)
        }
      })
    }, 500)
  }

  private getNewsFromServer() {
    if (this.userId === undefined) return
    this.newsManager.getNews(this.userId).subscribe({
      next: (postArray: Post[]) => {
        this.newsList = postArray
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
