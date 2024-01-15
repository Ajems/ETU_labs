import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../types/user";
import {LOCATIONS} from "../../../types/location/locationPage";
import {Router} from "@angular/router";
import {PhotoManagerService} from "../../../services/photoManager/photo-manager.service";

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {
  @Input() user?: User
  avatarUrl: string | null = null;

  constructor(
    private photoManager: PhotoManagerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
        this.loadAvatar()
    }

  private loadAvatar() {
    console.log("Load avatar")
    if (this.user === undefined) return
    this.photoManager.loadUserAvatar(this.user.id).subscribe({
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

  public redirectToUserPage(){
    if (!this.user) return
    this.router.navigate([LOCATIONS.USER_PAGE(this.user.id)])
  }
}


