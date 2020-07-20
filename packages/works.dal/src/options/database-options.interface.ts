/**
 * Represents options for a database.
 */
export interface IZDatabaseOptions {
  /**
   * The name of the database to connect to and modify.
   */
  database: string;
  /**
   * The database connection string.
   */
  url?: string;
  /**
   * The timeout value for connections.
   */
  timeout?: number;
}
