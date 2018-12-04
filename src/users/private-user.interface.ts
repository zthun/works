import { IPublicUser } from './public-user.interface';
import { IUserPassword } from './user-password.interface';

export interface IPrivateUser extends IPublicUser, IUserPassword { }
