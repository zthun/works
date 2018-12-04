import { IPublicUser } from './public-user.interface';

export class PublicUser implements IPublicUser {
  public static from(other: IPublicUser): IPublicUser {
    const clean = new PublicUser();
    clean._id = other._id;
    clean.email = other.email;
    return clean;
  }

  public _id?: string;
  public email: string;

  public constructor() {
    this.email = '';
  }
}
