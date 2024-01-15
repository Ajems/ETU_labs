import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {LOCATIONS} from "../../../types/location/locationPage";
import {RegisterManagerService} from "../../../services/registerManager/register-manager.service";
import {RegisterResponse} from "../../../types/response/registerResponse";
import {UserData} from "../../../types/userData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fName = new FormControl('', [Validators.required]);
  mName = new FormControl('', [Validators.required]);
  lName = new FormControl('', [Validators.required]);
  birthday = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private registerManager: RegisterManagerService,
    private router: Router
  ) {
  }

  sendUserDataToServer(userData: UserData){
    if (!this.userDataIsCorrect(userData)) return
    this.registerManager.tryRegister(userData).subscribe({
      next: (registerResponse: RegisterResponse) => {
        if(registerResponse.correctData) {
          this.router.navigate([LOCATIONS.LOGIN()])
        }
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  userDataIsCorrect(userData: UserData): boolean {
    const birthYear = new Date(userData.birthday).getFullYear();
    if (birthYear < 1900) {
      return false;
    }

    const currentDate = new Date();
    const userBirthDate = new Date(userData.birthday);
    const age = currentDate.getFullYear() - userBirthDate.getFullYear();

    if (currentDate.getMonth() < userBirthDate.getMonth() ||
      (currentDate.getMonth() === userBirthDate.getMonth() && currentDate.getDate() < userBirthDate.getDate())) {
      return age - 1 > 14;
    }

    return age > 14;  }

  dataCorrect(): boolean {
    const isFNameValid = !this.fName.invalid && this.fName.value !== '';
    const isMNameValid = !this.mName.invalid && this.mName.value !== '';
    const isLNameValid = !this.lName.invalid && this.lName.value !== '';
    const isBirthdayValid = !this.birthday.invalid && this.birthday.value !== ''
    const isEmailValid = !this.email.invalid && this.email.value !== '';
    const isPasswordValid = !this.password.invalid && this.password.value !== '';

    return isFNameValid && isMNameValid && isLNameValid && isBirthdayValid && isEmailValid && isPasswordValid;
  }


  registerUser(){
    if (this.dataCorrect()){
      const userData: UserData = {
        fName: this.fName.value || "",
        mName: this.mName.value || "",
        lName: this.lName.value || "",
        birthday: this.birthday.value || "",
        email: this.email.value || "",
        password: this.password.value || ""
      };
      this.sendUserDataToServer(userData)
    }
  }

  redirectToLogin() {
    this.router.navigate([LOCATIONS.LOGIN()])
  }

  getErrorMessage(control: FormControl, fieldName: string): string {
    if (control.hasError('required')) {
      return `${fieldName} обязательное поле`;
    }
    if (control.hasError('email')) {
      return 'Неверный формат email';
    }
    return ""
  }
}
