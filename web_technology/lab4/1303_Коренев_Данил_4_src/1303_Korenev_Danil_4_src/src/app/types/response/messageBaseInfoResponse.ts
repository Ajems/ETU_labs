export class MessageBaseInfoResponse {
  senderId?: number
  companionId?: number
  ownerName?: string
  companionName?: string
  constructor(
    senderId: number,
    companionId: number,
    ownerName: string,
    companionName: string
  ) {
    this.senderId = senderId
    this.companionId = companionId
    this.ownerName = ownerName
    this.companionName = companionName
  }
}
