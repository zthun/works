import { findIndex } from 'lodash';
import { IZAlert } from './alert.interface';

/**
 * Represents an alert stack with support to auto remove the alerts.
 */
export class ZAlertStack {
  private _list: IZAlert[] = [];

  /**
   * Initializes a new instance of this object.
   *
   * @param _max The maximum stack size.
   */
  public constructor(private _max: number = Infinity) {}

  /**
   * Returns the list.
   */
  public toArray(): IZAlert[] {
    return this._list;
  }

  /**
   * Adds an alert to the front of the list.
   *
   * @param alert The alert to add.
   *
   * @returns True if the alert was added, false if it is already in the list.
   */
  public add(alert: IZAlert): boolean {
    const { _id } = alert;
    const index = findIndex(this._list, (item) => item._id === _id);

    if (index >= 0) {
      return false;
    }

    this._list.splice(0, 0, alert);

    if (alert.timeToLive > 0 && alert.timeToLive < Infinity) {
      setTimeout(() => this.remove(_id), alert.timeToLive);
    }

    while (this._list.length > this._max) {
      this._list.pop();
    }

    return true;
  }

  /**
   * Removes an alert from the list if it exists in the list.
   *
   * @param alert Either the id of an alert or an alert object to remove.
   *
   * @returns True if an alert was removed.  False otherwise.
   */
  public remove(alert: string | IZAlert): boolean {
    const id = typeof alert === 'string' ? alert : alert._id;
    const index = findIndex(this._list, (item) => item._id === id);

    if (index < 0) {
      return false;
    }

    this._list.splice(index, 1);
    return true;
  }
}
