import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/ui/login/login.component';
import { UserPageComponent } from './components/ui/user-page/user-page.component';
import { NewsComponent } from './components/ui/news/news.component';
import { MessengerComponent } from './components/ui/messenger/messenger.component';
import {RouterOutlet} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import { PostComponent } from './components/ui/post/post.component';
import {MatCardModule} from "@angular/material/card";
import { MessagesComponent } from './components/ui/messages/messages.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/ui/register/register.component';
import { SelfPageComponent } from './components/ui/self-page/self-page.component';
import { FriendsComponent } from './components/ui/friends/friends.component';
import { UserPreviewComponent } from './components/ui/user-preview/user-preview.component';
import { NavigationComponent } from './components/ui/navigation/navigation.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { AddPostComponent } from './components/ui/add-post/add-post.component';
import { NewsFeedComponent } from './components/ui/news-feed/news-feed.component';
import { MessageComponent } from './components/ui/message/message/message.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserPageComponent,
    NewsComponent,
    MessengerComponent,
    PostComponent,
    MessagesComponent,
    RegisterComponent,
    SelfPageComponent,
    FriendsComponent,
    UserPreviewComponent,
    NavigationComponent,
    AddPostComponent,
    NewsFeedComponent,
    MessageComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterOutlet,
        MatInputModule,
        MatButtonModule,
        NgOptimizedImage,
        MatCardModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule
    ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
