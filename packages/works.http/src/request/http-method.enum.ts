/**
 * Represents an available method for an http invocation.
 */
export enum ZHttpMethod {
  /**
   * GET
   *
   * Used for reads
   */
  Get = 'get',

  /**
   * PUT
   *
   * Used for updates.
   */
  Put = 'put',

  /**
   * POST
   *
   * Use for create.
   */
  Post = 'post',

  /**
   * DELETE.
   *
   * Used for....delete..duh.
   */
  Delete = 'delete',

  /**
   * PATCH.
   *
   * Used for updates but only
   * partials of objects.
   */
  Patch = 'patch',

  /**
   * OPTIONS
   *
   * Used to retrieve the available methods and
   * accessors for a single api.  Normally used
   * by the browser.
   */
  Options = 'options',

  /**
   * HEAD
   *
   * Used for retrieving the headers that would
   * be returned.
   */
  Head = 'head'
}
