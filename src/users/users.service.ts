import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IZDatabase } from '@zthun/dal';
import { pick } from 'lodash';
import { AuthService } from '../auth/auth.service';
import { IPrivateUser } from './private-user.interface';
import { PublicUser } from './public-user.class';
import { IPublicUser } from './public-user.interface';
import { IUserEmail } from './user-email.interface';
import { IUserPassword } from './user-password.interface';

@Injectable()
export class UsersService {

  public constructor(
    private _auth: AuthService,
    @Inject('AuthDatabase') private readonly _dal: IZDatabase) { }

  public async list(): Promise<IPublicUser[]> {
    const users = await this._dal.read<IPrivateUser>('users').run();
    return users.map((user) => PublicUser.from(user));
  }

  public async read(pid: string): Promise<IPublicUser> {
    const filter = { _id: { $eq: pid } };
    const user = await this._dal.read<IPrivateUser>('users').filter(filter).run();
    this._auth.assert(user.length > 0, () => new NotFoundException());
    return PublicUser.from(user[0]);
  }

  public async create(user: IPrivateUser): Promise<IPublicUser> {
    const filter = { email: pick(user, 'email') };
    const count = await this._dal.count('users').filter(filter).run();
    this._auth.assert(count === 0, () => new ConflictException());
    const newUser = await this._dal.create('users', [user]).run();
    return PublicUser.from(newUser[0]);
  }

  public async updateEmail(pid: string, email: IUserEmail): Promise<IPublicUser> {
    const idFilter = { _id: pid };
    const emailFilter = { email, _id: { $ne: pid } };
    const user = await this._dal.read<IPrivateUser>('users').filter(idFilter).run();
    this._auth.assert(user.length > 0, () => new NotFoundException());
    const count = await this._dal.count('users').filter(emailFilter).run();
    this._auth.assert(count === 0, () => new ConflictException());
    user[0].email = email.email;
    await this._dal.update<IPrivateUser>('users', user[0]).filter(idFilter).run();
    return PublicUser.from(user[0]);
  }

  public async updatePassword(pid: string, pwd: IUserPassword): Promise<IPublicUser> {
    const filter = { _id: pid };
    const user = await this._dal.read<IPrivateUser>('users').filter(filter).run();
    this._auth.assert(user.length > 0, () => new NotFoundException());
    user[0].password = pwd.password;
    await this._dal.update<IPrivateUser>('users', user[0]).filter(filter).run();
    return PublicUser.from(user[0]);
  }

  public async remove(pid: string): Promise<IPublicUser> {
    const filter = { _id: pid };
    const user = await this._dal.read<IPrivateUser>('users').filter(filter).run();
    this._auth.assert(user.length > 0, () => new NotFoundException());
    await this._dal.delete('users').filter(filter).run();
    return PublicUser.from(user[0]);
  }
}
