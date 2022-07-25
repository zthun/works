import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IZLogin, IZProfile, IZUser, ZUserBuilder } from '@zthun/works.core';
import { IZDatabase } from '@zthun/works.dal';
import { compare, hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { ZUsersCollections, ZUsersDatabase } from './users.database';

@Controller()
/**
 * Represents a service to manage the user database with business rules.
 */
export class ZUsersService {
  /**
   * The password encryption rounds.
   */
  public static readonly BcryptRounds = 10;

  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer.
   */
  public constructor(@Inject(ZUsersDatabase.Token) private readonly _dal: IZDatabase) {}

  /**
   * Gets a specific user by their id or email.
   *
   * @param filter The filter that contains the _id or email of the user to find.  If you specify both,
   *               then the user is only returned if the user with the given email matches the user
   *               with the given id.  If both id and email are falsy, then null is returned.
   *
   * @returns A promise that, when resolved, has the found user.  Returns null if no such user exists.
   */
  @MessagePattern({ cmd: 'find' })
  public async find(filter: { _id?: string; email?: string }): Promise<IZUser | null> {
    if (!filter._id && !filter.email) {
      return null;
    }

    const [user] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter(filter).run();
    return user || null;
  }

  /**
   * Creates a new user.
   *
   * @param login The user to create from a login configuration.
   *
   * @returns A promise that, when resolved, has returned the new user.
   */
  @MessagePattern({ cmd: 'create' })
  public async create({ login }: { login: IZLogin }): Promise<IZUser> {
    const total = await this._dal.count(ZUsersCollections.Users).run();
    const password = await hash(login.password, ZUsersService.BcryptRounds);
    const builder = new ZUserBuilder().email(login.email).password(password);

    // This just generates a random key of some length up to 120ish
    const activator = v4();
    const create = total === 0 ? builder.super().active().build() : builder.inactive(activator).build();
    const [created] = await this._dal.create(ZUsersCollections.Users, [create]).run();
    return created;
  }

  /**
   * Updates an existing user.
   *
   * @param id The id of the user to update.
   * @param profile The profile template to update the user with.
   *
   * @returns A promise that, when resolved, has returned the updated user.
   */
  @MessagePattern({ cmd: 'update' })
  public async update({ id, profile }: { id: string; profile: IZProfile }): Promise<IZUser | null> {
    const template: Partial<IZUser> = {};

    if (profile.email != null) {
      // Changing the email will cause the account to inactivate.
      const temp = new ZUserBuilder().email(profile.email).inactive(v4()).build();
      template.activator = temp.activator;
      template.email = temp.email;
    }

    if (profile.password != null) {
      template.password = await hash(profile.password, ZUsersService.BcryptRounds);
      template.recovery = null;
    }

    if (Object.prototype.hasOwnProperty.call(profile, 'display')) {
      template.display = profile.display;
    }

    if (Object.prototype.hasOwnProperty.call(profile, 'avatar')) {
      template.avatar = profile.avatar;
    }

    if (JSON.stringify(template) === JSON.stringify({})) {
      return await this.find({ _id: id });
    }

    await this._dal.update<IZUser>(ZUsersCollections.Users, template).filter({ _id: id }).run();
    const [updated] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: id }).run();

    return updated;
  }

  /**
   * Activates a user.
   *
   * @param user The user to activate.
   *
   * @returns A promise that, when resolved, returns the updated user.
   */
  @MessagePattern({ cmd: 'activate' })
  public async activate({ user }: { user: IZUser }): Promise<IZUser> {
    const copy = new ZUserBuilder().copy(user).build();
    copy.activator = null;
    await this._dal.update<IZUser>(ZUsersCollections.Users, copy).filter({ _id: copy._id }).run();
    const [updated] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: copy._id }).run();
    return updated;
  }

  /**
   * Deactivates a user.
   *
   * This simply copies the existing user and adds a new activation code.  If the user is already
   * deactivated, then a new activation code is set with an updated expiration.
   *
   * @param user The user to deactivate.
   *
   * @returns A promise that, when resolved, returns the updated user.
   */
  @MessagePattern({ cmd: 'deactivate' })
  public async deactivate({ user }: { user: IZUser }): Promise<IZUser> {
    const copy = new ZUserBuilder().copy(user).inactive(v4()).build();
    await this._dal.update<IZUser>(ZUsersCollections.Users, copy).filter({ _id: copy._id }).run();
    const [updated] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: copy._id }).run();
    return updated;
  }

  /**
   * Sets the user up for a password recovery.
   *
   * @param email The email of the account to recover.
   *
   * @returns A promise that resolves to the generated password for the user with the expiration date.  Resolves to null if no user with the given email exists.
   */
  @MessagePattern({ cmd: 'recover' })
  public async recover({ email }: { email: string }): Promise<string | null> {
    const current = await this.find({ email });

    if (current) {
      const generated = this._password();
      const crypt = await hash(generated, ZUsersService.BcryptRounds);
      const updated = new ZUserBuilder().copy(current).recover(crypt).build();
      await this._dal.update<IZUser>(ZUsersCollections.Users, updated).filter({ _id: updated._id }).run();
      return generated;
    }

    return null;
  }

  /**
   * Timestamps the user login.
   *
   * @param id The id of the account to login.
   *
   * @returns A promise that resolves with the user that has been logged in, or null if
   * no such user exists.
   */
  @MessagePattern({ cmd: 'login' })
  public async login({ id }: { id: string }): Promise<IZUser | null> {
    const current = await this.find({ _id: id });

    if (current == null) {
      return null;
    }

    const updated = new ZUserBuilder().copy(current).login().build();
    await this._dal.update<IZUser>(ZUsersCollections.Users, updated).filter({ _id: updated._id }).run();
    return updated;
  }

  /**
   * Generates a random password between 17 and 24 characters.
   *
   * @returns A randomly generated password between 17 and 24 characters.
   */
  private _password() {
    // Between 17 and 24 characters
    const min = 17;
    const bounded = Math.random() * 7;
    const length = Math.floor(bounded + min);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-+=!@#$%^&*~';

    let pwd = '';

    while (pwd.length < length) {
      const chari = Math.floor(Math.random() * alphabet.length);
      pwd += alphabet.charAt(chari);
    }

    return pwd;
  }

  /**
   * Deletes an existing user.
   *
   * @param id The id of the user to  delete.
   *
   * @returns A promise that, when resolve, has returned the deleted user.
   */
  @MessagePattern({ cmd: 'remove' })
  public async remove({ id }: { id: string }): Promise<IZUser> {
    const [user] = await this._dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: id }).run();
    await this._dal.delete(ZUsersCollections.Users).filter({ _id: id }).run();
    return user;
  }

  /**
   * Compares the user and password to make sure it matches.
   *
   * @param credentials The credentials to check and compare with what is stored in the database.
   *
   * @returns A promise that resolves to true if the credentials match.  False if they do not.
   */
  @MessagePattern({ cmd: 'compare' })
  public async compare({ credentials }: { credentials: IZLogin }) {
    // This can use the temporary password, or the actual password.
    const user = await this.find({ email: credentials.email });

    if (user == null) {
      return false;
    }

    const passwordsMatch = await compare(credentials.password, user.password);

    if (passwordsMatch) {
      return true;
    }

    if (!user.recovery) {
      return false;
    }

    const tm = new Date().getTime();

    if (user.recovery.exp <= tm) {
      // Expired
      return false;
    }

    return await compare(credentials.password, user.recovery.password);
  }
}
