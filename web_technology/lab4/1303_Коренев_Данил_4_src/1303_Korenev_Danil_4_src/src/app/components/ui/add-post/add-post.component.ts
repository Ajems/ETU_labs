import {Component, Input, Output} from '@angular/core';
import {NewsManagerService} from "../../../services/newsManager/news-manager.service";
import * as io from 'socket.io-client';
import {Post} from "../../../types/post";


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @Input() userId?: number
  @Output() postText: string = ""
  private socket: io.Socket


  constructor(
    private newsManager: NewsManagerService
  ) {
    this.socket = io.connect('https://localhost:443');
  }

  publishPost() {
    if (this.postText.length === 0) return
    this.newsManager.addUserPost(this.postText).subscribe({
      next: (post: Post) => {
        this.postText = ""
        this.socket.emit("send-news", post)
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }
}
