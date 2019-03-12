export interface IUserToken {
  _id: string;
  expire?: Date;
  user: string;
}
