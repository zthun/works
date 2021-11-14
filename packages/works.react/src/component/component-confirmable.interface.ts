import { ReactElement } from 'react';

/**
 * Represents a component that has a confirmation.
 */
export interface IZComponentConfirmable {
  /**
   * The confirmation display.
   */
  confirmation?: string | ReactElement;

  /**
   * The confirmation color.
   */
  confirmationColor?: 'primary' | 'default' | 'secondary';

  /**
   * The form name of the confirmation.  Mostly only used with forms.
   */
  confirmationName?: string;

  /**
   * Sets whether or not the confirmation is checked by default.
   */
  autoConfirm?: boolean;
}
