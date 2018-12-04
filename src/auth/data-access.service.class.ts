import { Collection, Db, MongoClient } from 'mongodb';

export class DataAccessService {
  public static readonly Protocol = 'mongodb';
  public static readonly Host = 'localhost';
  public static readonly Port = 32769;

  public static get connection() {
    return `${DataAccessService.Protocol}://${DataAccessService.Host}:${DataAccessService.Port}`;
  }

  public count<F>(database: string, collection: string, filter?: Partial<F>): Promise<number> {
    return this.do(database, collection, (docs: Collection<F>) => docs.countDocuments(filter));
  }

  public list<T>(database: string, collection: string): Promise<T[]> {
    return this.do(database, collection, (docs: Collection<T>) => docs.find().toArray());
  }

  public read<T>(database: string, collection: string, _id: any): Promise<T> {
    return this.do(database, collection, (docs: Collection<T>) => docs.findOne({ _id }));
  }

  public create<T>(database: string, collection: string, doc: T): Promise<T> {
    return this.do(database, collection, async (docs: Collection<T>) => {
      const result = await docs.insertOne(doc);
      return Object.assign(doc, { _id: (result).insertedId });
    });
  }

  public update<T>(database: string, collection: string, _id: any, doc: T): Promise<T> {
    return this.do(database, collection, async (docs: Collection<T>) => {
      const result = await docs.updateOne({ _id }, { $set: doc });
      return result.modifiedCount >= 1 ? Object.assign(doc, { _id }) : null;
    });
  }

  public remove(database: string, collection: string, _id: any): Promise<boolean> {
    return this.do(database, collection, async (users: Collection<any>) => users.deleteOne({ _id }).then((res) => res.deletedCount >= 1));
  }

  public async do<C, T>(database: string, collection: string, fn: (col: Collection<C>, db: Db) => Promise<T>) {
    const client = new MongoClient(DataAccessService.connection, { useNewUrlParser: true });

    try {
      const conn = await client.connect();
      const db = conn.db(database);
      const col = db.collection<C>(collection);
      const res: T = await fn(col, db);
      client.close();
      return res;
    } catch (err) {
      client.close();
      throw err;
    }
  }
}
