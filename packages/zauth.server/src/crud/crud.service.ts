import { BadRequestException, Inject, Injectable, NotFoundException, Type } from '@nestjs/common';
import { IZDatabase } from '@zthun/dal';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';
import { IZCrudFlow } from './crud-flow.interface';

/**
 * Represents a service that handles crud operations without boiler plate code.
 */
@Injectable()
export class ZCrudService {
  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer.
   */
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  /**
   * Returns a list of items.
   *
   * @param wf The crud flow object for validation and ownership.
   *
   * @returns A promise that resolves the list of items.
   */
  public async list<T>(wf: IZCrudFlow<T>): Promise<T[]> {
    const blobs = await this._dal.read<T>(wf.collection()).run();
    return Promise.all(blobs.map((itm) => wf.sanitize(itm)));
  }

  /**
   * Reads an individual item.
   *
   * The item will be sanitized (read: Redacted) before being returned.
   *
   * @param _id The id of the item to read.
   * @param wf The crud flow object for validation and ownership.
   *
   * @returns A promise that resolves the single item.
   *
   * @throws NotFoundException if there is no such item.
   */
  public async read<T>(_id: string, wf: IZCrudFlow<T>): Promise<T> {
    const item = await this.find(_id, wf);
    ZHttpAssert.assert(!!item, () => new NotFoundException());
    return wf.sanitize(item);
  }

  /**
   * Creates a new item from a template.
   *
   * @param template The item template.
   * @param wf The crud flow object for validation and ownership.
   *
   * @returns A promise that resolves the item created.
   *
   * @throws HttpException if a validation exception occurs.
   */
  public async create<T>(template: T, wf: IZCrudFlow<T>): Promise<T> {
    const created = await wf.validateCreate(template);
    const blobs = await this._dal.create(wf.collection(), [created]).run();
    return wf.sanitize(blobs[0]);
  }

  /**
   * Updates an existing item from a partial item template.
   *
   * @param _id The id of the item to update.
   * @param template The template that contains the properties to update.
   * @param wf The crud flow object for validation and ownership.
   *
   * @returns A promise that resolves the item updated.
   *
   * @throws HttpException if a validation exception occurs.
   */
  public async update<T>(_id: string, template: Partial<T>, wf: IZCrudFlow<T>): Promise<T> {
    const filter = { _id };
    const collection = wf.collection();
    let blobs = await this._dal.read<T>(collection).filter(filter).run();
    ZHttpAssert.assert(blobs.length > 0, () => new NotFoundException());
    const existing = blobs[0];
    const updated = await wf.validateUpdate(existing, template);
    await this._dal.update<T>(collection, updated).filter(filter).run();
    blobs = await this._dal.read<T>(collection).filter(filter).run();
    return wf.sanitize(blobs[0]);
  }

  /**
   * Deletes an existing item.
   *
   * @param _id The id of the item to remove.
   * @param wf The crud flow object for validations and ownership.
   *
   * @returns A promise that resolves the item removed.
   *
   * @throws NotFoundException if there is no item with the given id.
   * @throws HttpException if a validation exception occurs.
   */
  public async remove<T, D>(_id: string, wf: IZCrudFlow<T>, dto?: Type<D>): Promise<T> {
    const filter = { _id };
    const collection = wf.collection();
    const blobs = await this._dal.read<T>(collection).filter(filter).run();
    ZHttpAssert.assert(blobs.length > 0, () => new NotFoundException());
    const [blob] = blobs;

    if (dto) {
      const obj = plainToClass(dto, blob);
      await validateOrReject(obj).catch((err) => Promise.reject(new BadRequestException(err)));
    }

    await this._dal.delete(collection).filter(filter).run();
    return blob;
  }

  /**
   * Finds an item with a given id.
   *
   * The returned item will NOT be sanitized.
   *
   * @param _id The id of the item to find.
   * @param wf The crud flow object
   */
  public async find<T>(_id: string, wf: IZCrudFlow<T>): Promise<T> {
    const filter = { _id };
    const collection = wf.collection();
    const blobs = await this._dal.read<T>(collection).filter(filter).run();
    return blobs.length > 0 ? blobs[0] : null;
  }
}
