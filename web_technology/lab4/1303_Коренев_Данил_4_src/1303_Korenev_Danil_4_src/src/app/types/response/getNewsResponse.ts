import {Post} from "../post";

export class GetNewsResponse {
  public news: Post[] = []

  constructor(news: Post[]) {
    this.news = news
  }
}
