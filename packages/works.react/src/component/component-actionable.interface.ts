/**
 * Represents a component that is responsible for invoking an action from the user.
 */
export interface IZComponentActionable {
  /**
   * The text of the action.
   */
  actionText?: string;

  /**
   * The action color.
   */
  actionColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

  /**
   * The type of action.
   */
  actionType?: 'button' | 'submit' | 'reset';

  /**
   * Occurs when the action is invoked.
   */
  onAction?: () => void;
}
