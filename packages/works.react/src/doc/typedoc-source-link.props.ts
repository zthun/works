import { IZTypedocSource } from '@zthun/works.core';

/**
 * Represents properties for the ZTypedocSourceLink component.
 */
export interface IZTypedocSourceLinkProps {
  /**
   * The source data to link to.
   */
  src?: IZTypedocSource;

  /**
   * The repository source.
   *
   * Currently, only github is calculated out of the box.  Anything else must be
   * the fully qualified url to the repository.  This includes the branch, commit, user, and project if
   * applicable.
   *
   * Defaults to github.
   */
  repo: 'github' | string;

  /**
   * The link target.
   *
   * Defaults to _blank.
   */
  target: string;

  /**
   * The user that owns the project.
   *
   * Only used if the repo is bitbucket or github.
   */
  user?: string;

  /**
   * The project under the user to link to.
   *
   * Only used if the repo is bitbucket or github.
   */
  project?: string;

  /**
   * The branch name.
   *
   * Only used if the repo is not the full url.  The usage of this depends on what supported repository is used.
   */
  branch?: string;

  /**
   * The commit hash.
   *
   * Only used if the repo is not the full url.  The usage of this depends on what supported repository is used.
   */
  commit?: string;
}
