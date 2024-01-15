import {Component, OnInit} from '@angular/core';
import {Post} from "../../../types/post";
import {NewsManagerService} from "../../../services/newsManager/news-manager.service";
import * as io from "socket.io-client";
import {UserManagerService} from "../../../services/userManager/user-manager.service";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit{
  public newsList: Post[] = []
  private socket: io.Socket;

  constructor(
    private newsManager: NewsManagerService,
    private userManager: UserManagerService
  ) {
    this.socket = io.connect('https://localhost:443');
  }

  ngOnInit(): void {
    this.getNewsFeed()
    setTimeout(() => {
      this.socket.on('new-news', (post) => {
        this.mustLoadPost(post)
      })
    }, 300)
  }

  private getNewsFeed() {
    this.newsManager.getNewsFeed().subscribe({
      next: (postArray: Post[]) => {
        this.newsList = postArray
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private mustLoadPost(post: Post) {
    if (post.ownerId === null) return
    this.userManager.getIsUserFriend(post.ownerId).subscribe({
      next: (isFriend: boolean) => {
        if (isFriend){
          this.newsList.unshift(post)
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
