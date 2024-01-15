export class User {
  public id : number
  public fName: string
  public mName: string
  public lName: string
  public birthday: string
  public email: string

  constructor(id: number, fName: string, mName: string, lName: string, birthday: string, email: string) {
    this.id = id
    this.fName = fName
    this.mName = mName
    this.lName = lName
    this.birthday = birthday
    this.email = email
  }
}
