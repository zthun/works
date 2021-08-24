import { findIndex } from 'lodash';
import { createContext, useContext } from 'react';
import { Observable, Subject } from 'rxjs';
import { useWatchableState } from '../store/use-watchable-state.hook';
import { IZAlert } from './alert';

/**
 * Represents a mutable stack of alerts.
 */
export interface IZAlertStack {
  /**
   * The current alert list.
   */
  readonly list: IZAlert[];

  /**
   * The observable that streams in when the alert list changes.
   */
  readonly listChange: Observable<IZAlert[]>;

  /**
   * The maximum number of alerts to hold.
   */
  readonly max: number;

  /**
   * Adds alert to the alert list.
   *
   * @param alert The alert to add.
   *
   * @returns True if the alert was added, false otherwise.
   */
  add(alert: IZAlert): boolean;

  /**
   * Removes an alert from the alert list.
   *
   * @param alert The alert to remove.
   *
   * @returns True if an alert was removed, false otherwise.
   */
  remove(alert: IZAlert): boolean;
}

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
   * @param max The maximum stack size.  The default is 5.
   */
  public constructor(public max = 5) {}

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

/**
 * Represents the context for the globally provided alert stack.
 */
export const ZAlertStackContext = createContext<IZAlertStack>(new ZAlertStack());

/**
 * Returns the current global alert stack.
 *
 * If you add to the stack, your component will not render.  If you need
 * your component to render when the stack changes, use @see useAlertState instead.
 *
 * @returns The current alert stack.
 */
export function useAlertStack(): IZAlertStack {
  return useContext(ZAlertStackContext);
}

/**
 * Returns the current global alert stack.
 *
 * This version of the hook will cause your component to render whenever the
 * stack changes.  If you don't need your component to render when the alert
 * stack changes, use @see useAlertStack instead.
 *
 * @returns The current alert stack.
 */
export function useAlertState(): IZAlertStack {
  const stack = useAlertStack();
  return useWatchableState(stack.list, stack.listChange, stack);
}
