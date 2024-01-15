import { Component } from '@angular/core';
import {LOCATIONS} from "../../../types/location/locationPage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(
    private router: Router,
  ) {
  }

  redirectSelfPage() {
    this.router.navigate([LOCATIONS.SELF_PAGE()])
  }

  redirectFriend() {
    this.router.navigate([LOCATIONS.FRIENDS_SELF_LIST()])
  }

  redirectNews() {
    this.router.navigate([LOCATIONS.NEWS()])
  }

  logout() {
    this.router.navigate([LOCATIONS.LOGIN()])
  }

}
