import { ReactNode } from 'react';

/**
 * Represents a component that has a confirmation.
 */
export interface IZComponentConfirmable {
  /**
   * The confirmation display.
   */
  confirmation: ReactNode;

  /**
   * The yes ui.
   */
  yes: ReactNode;

  /**
   * The no/cancel ui.
   */
  no: string;
}
