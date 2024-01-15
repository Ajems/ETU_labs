import {Component, OnInit} from '@angular/core';
import {LOCATIONS} from "../../../types/location/locationPage";
import {ActivatedRoute, Router} from "@angular/router";
import {UserManagerService} from "../../../services/userManager/user-manager.service";
import {UserInfoResponse} from "../../../types/response/userInfoResponse";
import {FriendsManagerService} from "../../../services/friendsManager/friends-manager.service";
import {PhotoManagerService} from "../../../services/photoManager/photo-manager.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  isFriend?: boolean

  userId?: number
  fName: string = ""
  mName: string = ""
  lName: string = ""
  birthday: string = ""
  avatarUrl: string | null = null;

  constructor(
    private userManager: UserManagerService,
    private friendsManager: FriendsManagerService,
    private photoManager: PhotoManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.getUserInfo()
    this.getIsFriend()
  }

  private getIsFriend() {
    const userId: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.userManager.getIsUserFriend(userId).subscribe({
      next: (isFriend: boolean) => {
        this.isFriend = isFriend
        console.log(this.isFriend)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private getUserInfo() {
    const userId: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.userManager.getUserInfo(userId).subscribe({
      next: (UIR: UserInfoResponse) => {
        this.userId = UIR.id
        this.fName = UIR.data.fName
        this.mName = UIR.data.mName
        this.lName = UIR.data.lName
        this.birthday = UIR.data.birthday
        this.checkRedirectToSelfPage()
        this.loadAvatar()
      },
      error: err => {
        console.log(err.error.message())
      }
    })
  }

  loadAvatar() {
    if (this.userId === undefined) return
    this.photoManager.loadUserAvatar(this.userId).subscribe({
      next: (avatar: Blob) => {
        console.log("avatar loaded")
        const blob = new Blob([avatar], { type: 'image/png' });
        this.avatarUrl = URL.createObjectURL(blob);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  redirectFriends() {
    if (this.userId !== undefined){
      this.router.navigate([LOCATIONS.FRIENDS_LIST(this.userId!)])
    }
  }

  redirectSendMessage() {
    if (this.userId !== undefined) {
      this.router.navigate([LOCATIONS.MESSAGES(this.userId)])
    }
  }

  sendFriendRequest() {
    if (this.userId === undefined) return
    this.friendsManager.sendFriendRequest(this.userId).subscribe({
      next: (result: boolean) => {
        if (result) this.getIsFriend()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  refusalFriendRequest() {
    if (this.userId === undefined) return
    this.friendsManager.removeUserFriend(this.userId).subscribe({
      next: (result: boolean) => {
        if (result) this.getIsFriend()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private checkRedirectToSelfPage() {
    this.userManager.getSelfId().subscribe({
      next: (userId: number) => {
        if (userId === this.userId) this.router.navigate([LOCATIONS.SELF_PAGE()])
      },
      error: err => {
        console.log(err)
      }
    })
  }

  editAvatar() {

  }
}
