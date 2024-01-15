import {Component, Input, OnInit} from '@angular/core';
import {UserManagerService} from "../../../services/userManager/user-manager.service";
import {Router} from "@angular/router";
import {UserInfoResponse} from "../../../types/response/userInfoResponse";
import {LOCATIONS} from "../../../types/location/locationPage";
import {PhotoManagerService} from "../../../services/photoManager/photo-manager.service";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-self-page',
  templateUrl: './self-page.component.html',
  styleUrls: ['./self-page.component.css']
})
export class SelfPageComponent implements OnInit{
  userId?: number
  fName: string = ""
  mName: string = ""
  lName: string = ""
  birthday: string = ""
  email: string = ""
  isEditingAvatar = false;
  isAdmin = false
  selectedFile: File | null = null;
  avatarUrl: string | null = null;


  constructor(
    private userManager: UserManagerService,
    private photoManager: PhotoManagerService,
    private router: Router,
    private clipboard: Clipboard
  ) {
  }

  ngOnInit(): void {
    this.getSelfInfo()
  }

  private getSelfInfo() {
    this.userManager.getSelfInfo().subscribe({
      next: (UIR: UserInfoResponse) => {
        this.userId = UIR.id
        this.fName = UIR.data.fName
        this.mName = UIR.data.mName
        this.lName = UIR.data.lName
        this.email = UIR.data.email
        this.birthday = UIR.data.birthday
        this.loadRole()
        this.loadAvatar()
      },
      error: err => {
        console.log(err.error.message())
      }
    })
  }
  redirectFriends() {
    if (this.userId !== undefined){
      this.router.navigate([LOCATIONS.FRIENDS_LIST(this.userId!)])
    }
  }

  editAvatar() {
    this.isEditingAvatar = true;
  }

  uploadAvatar() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('avatar', this.selectedFile);
      this.photoManager.changeUserAvatar(formData).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.finishEditingAvatar()
          } else {
            // unsuccess upload
          }
        },
        error: err => {
          console.warn(err)
        }
      })
    } else {
      console.warn('No file selected for upload');
    }
  }

  finishEditingAvatar() {
    this.isEditingAvatar = false;
  }

  cancelEditingAvatar() {
    this.isEditingAvatar = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  private loadAvatar() {
    console.log("Load avatar")
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

  private loadRole() {
    this.userManager.isAdmin().subscribe({
      next: (isAdmin: boolean) => {
        this.isAdmin = isAdmin
      },
      error: err => {
        console.log(err)
      }
    })
  }

  redirectAdminPage() {
    if (this.isAdmin) window.location.replace("https://localhost/")
  }

  copyUrlPage() {
    const url = `https://localhost/userPage/${this.userId}`;
    this.clipboard.copy(url);  }
}
