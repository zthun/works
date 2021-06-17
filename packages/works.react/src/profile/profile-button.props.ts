import { IZProfile } from '@zthun/works.core';
import { IZComponentDisabled } from '../component/component-disabled.interface';

/**
 * Represents properties for the profile button.
 */
export interface IZProfileButtonProps extends IZComponentDisabled {
  /**
   * The current profile being displayed.
   *
   * If this is undefined, then the loading indicator is shown.
   * If this is null, then the Login button is shown.
   * If this is truthy, then the profile display and avatar is shown.
   */
  profile?: IZProfile;

  /**
   * Occurs when the button is clicked when the Login button is displayed.
   */
  onLogin: () => void;

  /**
   * Occurs when the button is clicked when the profile information is displayed.
   */
  onProfile: () => void;
}
