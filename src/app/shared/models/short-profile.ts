export class ShortProfile {
  public id: number;
  public name: string;
  public secondName: string;
  public nickname: string;
  public avatar: string;

  constructor(
    id: number,
    name: string,
    secondName: string,
    nickname: string,
    avatar: string
  ) {
    this.id = id;
    this.name = name;
    this.secondName = secondName;
    this.nickname = nickname;
    this.avatar = avatar;
  }
}
