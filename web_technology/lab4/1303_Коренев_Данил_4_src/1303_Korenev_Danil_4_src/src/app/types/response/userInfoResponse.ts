import {UserData} from "../userData";

export class UserInfoResponse {
  id: number;
  data: UserData
  role: string;
  status: string;

  constructor(userInfo: any) {
    this.id = userInfo.id;
    this.data = userInfo.data
    this.role = userInfo.role;
    this.status = userInfo.status;
  }
}
