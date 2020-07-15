import { IZProfile } from '@zthun/works.core';
import { Subject } from 'rxjs';
import { IZLoginState } from './login-state.interface';

/**
 * Represents an implementation of the IZLoginState.
 */
export class ZLoginState implements IZLoginState {
  /**
   * The current profile.
   *
   * If this is null, it means that user is not logged in or has not account.
   * If this is undefined, it means that the profile is currently loading.
   * If this is set to a valid profile object, the user is properly logged in.
   */
  public profile: IZProfile = null;
  /**
   * Occurs when the profile object changes.
   *
   * @see profile For information about the states.
   */
  public profileChange = new Subject<IZProfile>();

  /**
   * Initializes a new instance of this object.
   *
   * @param refreshFn The method to refresh the profile.  This can handle errors and recover if desired, but if
   *                  it does not, then this login
   */
  public constructor(private refreshFn: () => Promise<IZProfile>) {
    this.refresh();
  }

  /**
   * Refreshes the profile.
   *
   * @returns A promise that, when resolved, has updated the profile.
   */
  public async refresh(): Promise<IZProfile> {
    delete this.profile;
    this.profileChange.next();

    try {
      this.profile = await this.refreshFn();
    } catch {
      this.profile = null;
    }

    this.profileChange.next(this.profile);
    return this.profile;
  }
}
