
export class MessageResponse {
  senderId: number
  receiverId: number
  content: string
  dateCreated: Date
  constructor(
    senderId: number,
    receiverId: number,
    content: string,
    dateCreated: Date
  ) {
    this.senderId = senderId
    this.receiverId = receiverId
    this.content = content
    this.dateCreated = dateCreated
  }
}
