export class Post {
  public id: number | null;
  public ownerId: number | null;
  public ownerName: string | null;
  public content: string | null;
  public dateCreated: Date | null;

  constructor(id: number, ownerId: number, ownerName: string, content: string, dateCreated: Date) {
    this.id = id;
    this.ownerId = ownerId;
    this.ownerName = ownerName;
    this.content = content;
    this.dateCreated = dateCreated;
  }

  formatPostDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    if (this.dateCreated === null) return ""

    const formattedDate: string = new Intl.DateTimeFormat('ru-RU', options).format(this.dateCreated);
    return formattedDate.replace(',', ' в');
  }
}
