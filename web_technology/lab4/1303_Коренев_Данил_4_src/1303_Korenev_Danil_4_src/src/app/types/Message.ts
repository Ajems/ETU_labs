
export class Message {
  alignRight = false

  senderId: number
  receiverId: number
  ownerName: string
  content: string
  dateCreated: Date
  constructor(
    senderId: number,
    receiverId: number,
    ownerName: string,
    content: string,
    dateCreated: Date
  ) {
    this.senderId = senderId
    this.receiverId = receiverId
    this.ownerName = ownerName,
    this.content = content
    this.dateCreated = dateCreated
  }
}
