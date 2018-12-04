import { IUserEmail } from './user-email.interface';

export interface IPublicUser extends IUserEmail {
  _id?: string;
}
