import { Collection, MongoClient, MongoClientOptions } from 'mongodb';
import { v4 } from 'uuid';
import { IZDatabaseOptions, ZDatabaseOptionsBuilder } from '../options/database-options';
import { IZDatabaseQuery, ZDatabaseQuery } from '../query/database-query';
import { IZDatabase } from './database';

/**
 * Represents an IZDatabase object that connects to mongodb.
 */
export class ZDatabaseMongo implements IZDatabase {
  /**
   * Establishes connection parameters to a database.
   *
   * @param options The database options.  All options are used here.
   *
   * @returns A new database can can be used to connect and query a mongodb database instance.
   */
  public static connect(options: IZDatabaseOptions): ZDatabaseMongo {
    const db = new ZDatabaseMongo();
    db._options = new ZDatabaseOptionsBuilder().copy(options).build();
    return db;
  }

  private _options = new ZDatabaseOptionsBuilder().build();

  /**
   * Gets the connection options.
   *
   * @returns A copy of the connection options.
   */
  public get $options(): IZDatabaseOptions {
    return new ZDatabaseOptionsBuilder().copy(this._options).build();
  }

  /**
   * Gets the connection url.
   *
   * @returns The connection host.
   */
  public get $url(): string {
    return this._options.url || 'mongodb://127.0.0.1:32769';
  }

  /**
   * Gets the connection database.
   *
   * @returns The connection database.
   */
  public get $database(): string {
    return this._options.database;
  }

  /**
   * Returns a query that gives the document count for a filter.
   *
   * @param source The source to count.
   *
   * @returns The count query.
   */
  public count(source: string): IZDatabaseQuery<number> {
    return new ZDatabaseQuery((options) =>
      this._do(source, async (docs: Collection<any>) => {
        const result = await docs.countDocuments(options.$filter);
        return result;
      })
    );
  }

  /**
   * Adds all documents in template to the database.
   *
   * @param source The source to modify.
   * @param template The list of documents to add.
   *
   * @returns The create query.
   */
  public create<T>(source: string, template: T[]): IZDatabaseQuery<T[]> {
    return new ZDatabaseQuery<T[]>(() =>
      this._do(source, async (docs: Collection<T>) => {
        const withIds = template.map((t: any) => ({ ...t, _id: t._id || v4() }));
        const result = await docs.insertMany(withIds);
        const ids = Object.keys(result.insertedIds).map((index) => result.insertedIds[index]);
        const items = await docs.find({ _id: { $in: ids } }).toArray();
        return items as T[];
      })
    );
  }

  /**
   * Updates all documents that match the query filter with template.
   *
   * @param source The source to update.
   * @param template The template to update with.
   *
   * @returns The update query.
   */
  public update<T>(source: string, template: Partial<T>): IZDatabaseQuery<number> {
    return new ZDatabaseQuery((query) =>
      this._do(source, async (docs: Collection<T>) => {
        const result = await docs.updateMany(query.$filter as any, { $set: template as any });
        return result.modifiedCount;
      })
    );
  }

  /**
   * Reads document from the database that match a query.
   *
   * @param source The source to query.
   *
   * @returns The read query.
   */
  public read<T>(source: string): IZDatabaseQuery<T[]> {
    return new ZDatabaseQuery((query) =>
      this._do(source, async (docs: Collection<T>) => {
        const aggregate: any[] = [{ $match: query.$filter }];

        if (query.$join.length > 0) {
          query.$join.forEach((j) => aggregate.push({ $lookup: { from: j.from, localField: j.local, foreignField: j.foreign, as: j.as } }));
        }

        if (query.$sort.length > 0) {
          const sorting = {};
          query.$sort.forEach((srt) => (sorting[srt.key] = srt.direction));
          aggregate.push({ $sort: sorting });
        }

        if (query.$size !== Infinity) {
          const page = Math.max(0, query.$page);
          const take = query.$size;
          aggregate.push({ $skip: page * take });
          aggregate.push({ $limit: take });
        }

        return docs.aggregate<T>(aggregate).toArray();
      })
    );
  }

  /**
   * Deletes documents from the database that match a query.
   *
   * WARNING:  If you do not specify a filter object for the delete,
   * then the collection is completely emptied.
   *
   * @param source The source to delete from.
   *
   * @returns The delete query.
   */
  public delete(source: string): IZDatabaseQuery<number> {
    return new ZDatabaseQuery((query) =>
      this._do(source, async (docs: Collection<any>) => {
        const result = await docs.deleteMany(query.$filter);
        return result.deletedCount;
      })
    );
  }

  /**
   * Represents the body for a query invocation.
   *
   * @param collection The source to modify or read.
   * @param fn The inner invocation function that will be invoked for a query.  Takes the mongodb collection
   *           being modified.
   *
   * @returns A promise that, when resolved, has retrieved the results of the query operation.  Rejects if
   * fn(col) throws an exception or if a connection cannot be established.
   */
  private async _do<C, T>(collection: string, fn: (col: Collection<C>) => Promise<T>) {
    const options: MongoClientOptions = {};

    if (this._options.timeout) {
      options.serverSelectionTimeoutMS = this._options.timeout;
    }

    const client = new MongoClient(this.$url, options);

    try {
      const connection = client.connect();
      const conn = await connection;
      const db = conn.db(this.$database);
      const col = db.collection<C>(collection);
      const res: T = await fn(col);
      return res;
    } finally {
      // We don't actually need the events, so we can just force close the connection
      // as to not waste time with it.
      await client.close(true);
    }
  }
}