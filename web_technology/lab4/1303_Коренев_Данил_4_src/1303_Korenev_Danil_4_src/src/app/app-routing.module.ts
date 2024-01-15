import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/ui/login/login.component";
import { UserPageComponent } from "./components/ui/user-page/user-page.component";
import { NewsComponent } from "./components/ui/news/news.component";
import { MessengerComponent } from "./components/ui/messenger/messenger.component";
import { MessagesComponent } from "./components/ui/messages/messages.component";
import {RegisterComponent} from "./components/ui/register/register.component";
import {SelfPageComponent} from "./components/ui/self-page/self-page.component";
import {FriendsComponent} from "./components/ui/friends/friends.component";
import {NewsFeedComponent} from "./components/ui/news-feed/news-feed.component";

const routes: Routes =[
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'userPage/self', component: SelfPageComponent},
  { path: `userPage/:id`, component: UserPageComponent},
  { path: 'news', component: NewsFeedComponent},
  { path: 'messenger', component: MessengerComponent},
  { path: 'messages/:id', component: MessagesComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'friends/:id', component: FriendsComponent},
  { path: 'friends', component: FriendsComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
