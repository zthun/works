import { IZDatabaseQuery } from '../query/database-query';

/**
 * Represents a set of database operations for a document database.
 */
export interface IZDatabase {
  /**
   * Retrieves the count of documents from the source.
   *
   * @param source The source to count.
   *
   * @returns The query object that can be used to modify and invoke the query.
   */
  count(source: string): IZDatabaseQuery<number>;

  /**
   * Inserts many documents in the database.
   *
   * @param source The source to create into.
   * @param template The template document with or without the ids.
   *
   * @returns A query object that can be used to modify and invoke the query.
   */
  create<T>(source: string, template: T[]): IZDatabaseQuery<T[]>;

  /**
   * Updates fields in the database.
   *
   * @param source The source to update.
   * @param template The partial template that contains the fields to update.
   *
   * @returns A query object that can be used to modify and invoke the query.
   */
  update<T>(source: string, template: Partial<T>): IZDatabaseQuery<number>;

  /**
   * Reads fields from the database.
   *
   * @param source The source to read from.
   *
   * @returns A query object that can be used to modify and invoke the query.
   */
  read<T>(source: string): IZDatabaseQuery<T[]>;

  /**
   * Deletes documents from the database.
   *
   * @param source The source to delete from.
   *
   * @returns A query object that can be used to modify and invoke the query.
   */
  delete(source: string): IZDatabaseQuery<number>;
}
