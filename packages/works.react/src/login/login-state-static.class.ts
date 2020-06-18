import { IZProfile } from '@zthun/works.core';
import { Subject } from 'rxjs';
import { IZLoginState } from './login-state.interface';

/**
 * Represents a login state that can never change.
 */
export class ZLoginStateStatic implements IZLoginState {
  /**
   * Occurs when the profile object changes.
   *
   * @see profile For information about the states.
   */
  public profileChange = new Subject<IZProfile>();

  /**
   * Initializes a new instance of this object.
   *
   * @param profile The profile that never changes.
   */
  public constructor(public profile: IZProfile) {}

  /**
   * Returns a resolved promise with the giben profile.
   */
  public refresh() {
    return Promise.resolve(this.profile);
  }
}
