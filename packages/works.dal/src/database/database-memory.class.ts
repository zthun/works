import { MongoMemoryServer } from 'mongodb-memory-server';
import { ZDatabaseOptionsBuilder } from '../options/database-options-builder.class';
import { IZDatabaseOptions } from '../options/database-options.interface';
import { ZDatabaseQuery } from '../query/database-query.class';
import { IZDatabaseQuery } from '../query/database-query.interface';
import { ZDatabaseMongo } from './database-mongo.class';
import { IZDatabase } from './database.interface';

/**
 * Represents an in memory database.
 *
 * This will always run on localhost:32769 so you need to make sure that your
 * local port is open.
 *
 * It is not recommended to use this for a production system.  This is mostly
 * here for testing and mocking.
 */
export class ZDatabaseMemory implements IZDatabase {
  /**
   * The server host.
   */
  public static readonly Host = '127.0.0.1';
  /**
   * The server port.
   */
  public static readonly Port = 32769;
  /**
   * The server protocol.
   */
  public static readonly Protocol = 'mongodb';

  /**
   * Establishes a connection to a database in memory.
   *
   * @param options The database options.  The url is ignored.
   *
   * @returns An in memory database.
   */
  public static connect(options: IZDatabaseOptions): ZDatabaseMemory {
    const inner = new ZDatabaseOptionsBuilder().copy(options).url('mongodb://127.0.0.1:32769').build();
    return new ZDatabaseMemory(ZDatabaseMongo.connect(inner));
  }

  /**
   * Starts the in memory server.
   *
   * You don't need to call this, but you can pre-wire the
   * server to be ready before any queries are invoked.
   *
   * @returns A promise that when resolved, has started the server.
   */
  public static start(): Promise<boolean> {
    if (!ZDatabaseMemory._server) {
      const ip = ZDatabaseMemory.Host;
      const port = ZDatabaseMemory.Port;
      const instance = { port, ip };
      const autoStart = false;
      const server = new MongoMemoryServer({ instance, autoStart });
      ZDatabaseMemory._running = server.start();
      ZDatabaseMemory._server = server;
    }

    return ZDatabaseMemory._running;
  }

  /**
   * Kills the server.
   *
   * @returns A promise that when resolved, has stopped the server.
   */
  public static async kill(): Promise<boolean> {
    if (ZDatabaseMemory._server) {
      await ZDatabaseMemory._server.stop();
      ZDatabaseMemory._running = null;
      ZDatabaseMemory._server = null;
    }
    return true;
  }

  private static _running: Promise<boolean>;
  private static _server: MongoMemoryServer;

  /**
   * Initializes a new instance of this object.
   *
   * @param _mongo The actual mongo database instance.
   */
  private constructor(private readonly _mongo: IZDatabase) {}

  /**
   * Returns a query that gives the document count for a filter.
   *
   * @param source The source to count.
   *
   * @returns The count query.
   */
  public count<T>(source: string): IZDatabaseQuery<number> {
    return this._query(() => this._mongo.count(source));
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
    return this._query(() => this._mongo.create(source, template));
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
    return this._query(() => this._mongo.update(source, template));
  }

  /**
   * Reads document from the database that match a query.
   *
   * @param source The source to query.
   *
   * @returns The read query.
   */
  public read<T>(source: string): IZDatabaseQuery<T[]> {
    return this._query(() => this._mongo.read(source));
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
    return this._query(() => this._mongo.delete(source));
  }

  /**
   * Runs a mongo query.
   *
   * If the mongo memory server is not running, it will be started.
   * The query will only be ran after the server has been started.
   *
   * @param fn The callback that creates the database query.
   */
  private _query<T>(fn: () => IZDatabaseQuery<T>): IZDatabaseQuery<T> {
    return new ZDatabaseQuery(async (query) => {
      await ZDatabaseMemory.start();
      return fn().copy(query).run();
    });
  }
}
