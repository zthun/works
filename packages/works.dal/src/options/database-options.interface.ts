/**
 * Represents options for a database.
 */
export interface IZDatabaseOptions {
  /**
   * The name of the database to connect to and modify.
   */
  database: string;
  /**
   * The host of the server.
   */
  host?: string;
  /**
   * The port to connect on.
   */
  port?: number;
  /**
   * The database protocol.
   */
  protocol?: string;
  /**
   * The timeout value for connections.
   */
  timeout?: number;
}
