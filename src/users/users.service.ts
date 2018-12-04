import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { pick } from 'lodash';
import { v4 } from 'uuid';
import { AuthService } from '../auth/auth.service';
import { DataAccessService } from '../auth/data-access.service.class';
import { IPrivateUser } from './private-user.interface';
import { PublicUser } from './public-user.class';
import { IPublicUser } from './public-user.interface';
import { IUserEmail } from './user-email.interface';
import { IUserPassword } from './user-password.interface';

@Injectable()
export class UsersService {

  public constructor(private _auth: AuthService, private _dal: DataAccessService) { }

  public async list(): Promise<IPublicUser[]> {
    const users = await this._dal.list<IPrivateUser>('auth', 'users');
    return users.map((user) => PublicUser.from(user));
  }

  public async read(pid: string): Promise<IPublicUser> {
    const user = await this._dal.read<IPrivateUser>('auth', 'users', pid);
    this._auth.assert(!!user, () => new NotFoundException());
    return PublicUser.from(user);
  }

  public async create(user: IPrivateUser): Promise<IPublicUser> {
    const count = await this._dal.count('auth', 'users', pick(user, ['email']));
    this._auth.assert(count === 0, () => new ConflictException());
    user._id = v4();
    const newUser = await this._dal.create('auth', 'users', user);
    return PublicUser.from(newUser);
  }

  public async updateEmail(pid: string, email: IUserEmail): Promise<IPublicUser> {
    const user = await this._dal.read<IPrivateUser>('auth', 'users', pid);
    this._auth.assert(!!user, () => new NotFoundException());
    const count = await this._dal.count('auth', 'users', { email: email.email, _id: { $ne: pid } });
    this._auth.assert(count === 0, () => new ConflictException());
    user.email = email.email;
    const updated = await this._dal.update<IPrivateUser>('auth', 'users', pid, user);
    return PublicUser.from(updated);
  }

  public async updatePassword(pid: string, pwd: IUserPassword): Promise<IPublicUser> {
    const user = await this._dal.read<IPrivateUser>('auth', 'users', pid);
    this._auth.assert(!!user, () => new NotFoundException());
    user.password = pwd.password;
    const updated = await this._dal.update<IPrivateUser>('auth', 'users', pid, user);
    return PublicUser.from(updated);
  }

  public async remove(pid: string): Promise<IPublicUser> {
    const user = await this._dal.read<IPrivateUser>('auth', 'users', pid);
    this._auth.assert(!!user, () => new NotFoundException());
    await this._dal.remove('auth', 'users', pid);
    return PublicUser.from(user);
  }
}
