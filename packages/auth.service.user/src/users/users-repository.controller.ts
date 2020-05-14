import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IZLogin, IZUser, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { hash } from 'bcryptjs';
import { Collections } from '../common/collections.enum';
import { BcryptRounds } from '../common/crypt.constants';
import { DatabaseToken } from '../common/injection.constants';

/**
 * Represents a service to retrieve users.
 */
@Controller()
export class ZUsersRepositoryController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer.
   * @param _auth The auth service for simple tasks.
   */
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) {}

  /**
   * Gets a list of all users.
   *
   * @return A promise that, when resolved, has returned all users.
   */
  @MessagePattern('list')
  public async list(): Promise<IZUser[]> {
    const users = await this._dal.read<IZUser>(Collections.Users).run();
    return users;
  }

  /**
   * Gets a specific user by their id.
   *
   * @param _id The id of the user to find.
   *
   * @return A promise that, when resolved, has the found user.  Returns undefined if no such user exists.
   */
  @MessagePattern('findById')
  public async findById(_id: string): Promise<IZUser> {
    const filter = { _id };
    const [user] = await this._dal.read<IZUser>(Collections.Users).filter(filter).run();
    return user;
  }

  /**
   * Gets a specific user by their email.
   *
   * @param email The email of the user to find.
   *
   * @return A promise that, when resolved, has the found user by their email.  Returns null if no such user exists.
   */
  @MessagePattern('findByEmail')
  public async findByEmail(email: string): Promise<IZUser> {
    const filter = { email };
    const [user] = await this._dal.read<IZUser>(Collections.Users).filter(filter).run();
    return user;
  }

  /**
   * Creates a new user.
   *
   * @param login The user to create.
   *
   * @return A promise that, when resolved, has returned the new user.
   */
  @MessagePattern('create')
  public async create(login: IZLogin): Promise<IZUser> {
    const total = await this._dal.count(Collections.Users).run();
    const password = await hash(login.password, BcryptRounds);
    const builder = new ZUserBuilder().email(login.email).password(password);
    const create = total === 0 ? builder.super().build() : builder.build();
    const [created] = await this._dal.create(Collections.Users, [create]).run();
    return created;
  }

  /**
   * Updates an existing user.
   *
   * @return A promise that, when resolved, has returned the updated user.
   *
   * @throws NotFoundException If not user exists with the given id.
   * @throws ConflictException If the name of the user changes and there is already another user with the same name.
   */
  @MessagePattern('update')
  public async update({ id, login }: { id: string; login: Partial<IZLogin> }): Promise<IZUser> {
    const template: Partial<IZUser> = {};

    if (login.email) {
      template.email = login.email;
    }

    if (login.password) {
      template.password = await hash(login.password, BcryptRounds);
    }

    if (!template.email && !template.password) {
      return await this.findById(id);
    }

    await this._dal.update<IZUser>(Collections.Users, template).filter({ _id: id }).run();
    const [updated] = await this._dal.read<IZUser>(Collections.Users).filter({ _id: id }).run();
    return updated;
  }

  /**
   * Deletes an existing user.
   *
   * @param id The id of the user to  delete.
   *
   * @return A promise that, when resolve, has returned the deleted user.
   */
  @MessagePattern('remove')
  public async remove(id: string): Promise<IZUser> {
    const [user] = await this._dal.read<IZUser>(Collections.Users).filter({ _id: id }).run();
    await this._dal.delete(Collections.Users).filter({ _id: id }).run();
    return user;
  }
}
