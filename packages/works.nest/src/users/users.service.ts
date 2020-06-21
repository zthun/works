import { Inject, Injectable } from '@nestjs/common';
import { IZDatabase } from '@zthun/dal';
import { IZLogin, IZUser, ZUserBuilder } from '@zthun/works.core';
import { compare, hash } from 'bcryptjs';
import { ZUsersCollections } from './users.collections';
import { ZUsersDatabase } from './users.database';

/**
 * Represents a service to manage the user database with business rules.
 */
@Injectable()
export class ZUsersService {
  /**
   * The password encryption rounds.
   */
  public static readonly BcryptRounds = 10;

  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer.
   * @param _auth The auth service for simple tasks.
   */
  public constructor(@Inject(ZUsersDatabase.Token) private readonly _dal: IZDatabase) {}

  /**
   * Gets a list of all users in the database.
   *
   * @returns A promise that, when resolved, has returned all users.
   */
  public async list(): Promise<IZUser[]> {
    const users = await this._dal.read<IZUser>(ZUsersCollections.Users).run();
    return users;
  }

  /**
   * Gets a specific user by their id.
   *
   * @param _id The id of the user to find.
   *
   * @returns A promise that, when resolved, has the found user.  Returns undefined if no such user exists.
   */
  public async findById(_id: string): Promise<IZUser> {
    const filter = { _id };
    const [user] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter(filter).run();
    return user;
  }

  /**
   * Gets a specific user by their email.
   *
   * @param email The email of the user to find.
   *
   * @returns A promise that, when resolved, has the found user by their email.  Returns null if no such user exists.
   */
  public async findByEmail(email: string): Promise<IZUser> {
    const filter = { email };
    const [user] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter(filter).run();
    return user;
  }

  /**
   * Creates a new user.
   *
   * @param login The user to create.
   *
   * @returns A promise that, when resolved, has returned the new user.
   */
  public async create(login: IZLogin): Promise<IZUser> {
    const total = await this._dal.count(ZUsersCollections.Users).run();
    const password = await hash(login.password, ZUsersService.BcryptRounds);
    const builder = new ZUserBuilder().email(login.email).password(password);
    const create = total === 0 ? builder.super().active().build() : builder.build();
    const [created] = await this._dal.create(ZUsersCollections.Users, [create]).run();
    return created;
  }

  /**
   * Updates an existing user.
   *
   * @returns A promise that, when resolved, has returned the updated user.
   */
  public async update(id: string, login: Partial<IZLogin>): Promise<IZUser> {
    const template: Partial<IZUser> = {};

    if (login.email) {
      template.email = login.email;
    }

    if (login.password) {
      template.password = await hash(login.password, ZUsersService.BcryptRounds);
    }

    if (!template.email && !template.password) {
      return await this.findById(id);
    }

    await this._dal.update<IZUser>(ZUsersCollections.Users, template).filter({ _id: id }).run();
    const [updated] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: id }).run();
    return updated;
  }

  /**
   * Deletes an existing user.
   *
   * @param id The id of the user to  delete.
   *
   * @returns A promise that, when resolve, has returned the deleted user.
   */
  public async remove(id: string): Promise<IZUser> {
    const [user] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: id }).run();
    await this._dal.delete(ZUsersCollections.Users).filter({ _id: id }).run();
    return user;
  }

  /**
   * Compares the user and password to make sure it matches.
   *
   * @returns A promise that resolves to true if the credentials match.  False if they do not.
   */
  public async compare(credentials: IZLogin) {
    const user = await this.findByEmail(credentials.email);

    if (user == null) {
      return false;
    }

    const passwordsMatch = await compare(credentials.password, user.password);

    if (passwordsMatch) {
      return true;
    }

    return false;
  }
}
