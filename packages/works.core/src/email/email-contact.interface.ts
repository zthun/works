/**
 * Represents an email contact.
 */
export interface IZEmailContact {
  /**
   * The email address of the contact.
   */
  address: string;

  /**
   * The type of contact.
   *
   * This can be anything you want.  In the end, this has no bearing
   * on the final sent message.  It's just a descriptor to determine what this contact
   * represents if needed.
   */
  type?: string;

  /**
   * The display name of the contact.
   *
   * If this is falsy, then you can consider the
   * address as the display.
   */
  display?: string;
}
