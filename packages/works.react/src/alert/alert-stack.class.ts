import { findIndex } from 'lodash';
import { Subject } from 'rxjs';
import { IZAlertStack } from './alert-stack.interface';
import { IZAlert } from './alert.interface';

/**
 * Represents an alert stack with support to auto remove the alerts.
 */
export class ZAlertStack implements IZAlertStack {
  private _list: IZAlert[] = [];
  public listChange = new Subject<IZAlert[]>();

  /**
   * Returns a copy of the current list.
   *
   * @returns A copy of the current list.
   */
  public get list() {
    return this._list.slice();
  }

  /**
   * Initializes a new instance of this object.
   *
   *
   * @param max The maximum stack size.
   */
  public constructor(public max: number = Infinity) {}

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

    while (this._list.length > this.max) {
      this._list.pop();
    }

    this.listChange.next(this._list.slice());

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
    this.listChange.next(this._list.slice());
    return true;
  }
}
