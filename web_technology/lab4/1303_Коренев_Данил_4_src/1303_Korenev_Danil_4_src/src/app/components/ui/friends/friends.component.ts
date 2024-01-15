import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../types/user";
import {UsersListManagerService} from "../../../services/usersListManager/users-list-manager.service";
import {Post} from "../../../types/post";
import {UserInfoResponse} from "../../../types/response/userInfoResponse";
import {ActivatedRoute} from "@angular/router";
import {UserManagerService} from "../../../services/userManager/user-manager.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  userId?: number
  public friendsList: User[] = []

  constructor(
    private usersListManager: UsersListManagerService,
    private userManager: UserManagerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fillUserId()
  }

  private fillUserId() {
    const userId: string | null = this.route.snapshot.paramMap.get('id');
    if (userId === null) {
      this.userManager.getSelfId().subscribe({
        next: (userId: number) => {
          this.userId = userId
          this.fillFriendsList()
        },
        error: err => {
          console.log(err)
        }
      })
    } else {
      this.userId = parseInt(userId)
      this.fillFriendsList()
    }
  }

  private fillFriendsList() {
    this.usersListManager.getFriendsList(this.userId!).subscribe({
      next: (friendsList: UserInfoResponse[]) => {
        friendsList.map((friend: UserInfoResponse) => {
          this.friendsList.push(
            new User(
              friend.id,
              friend.data.fName,
              friend.data.mName,
              friend.data.lName,
              friend.data.birthday,
              friend.data.email
            )
          )
        })
        console.log(this.friendsList)
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }
}
