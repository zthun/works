import { PropTypes } from '@material-ui/core';

/**
 * Represents a component that is responsible for invoking an action from the user.
 */
export interface IZComponentActionable {
  /**
   * The text of the action.
   */
  actionText: string;
  /**
   * The action color.
   */
  actionColor: PropTypes.Color;
  /**
   * Occurs when the action is invoked.
   */
  onAction: () => void;
}
