import { findIndex, get, set } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { v4 } from 'uuid';
import { IZAlert, ZAlertBuilder } from './alert';

/**
 * Represents a service for managing global alerts.
 */
export interface IZAlertService {
  /**
   * Retrieves the current state of the alert stack.
   *
   * @returns A promise that resolves with the global alert stack.
   */
  all(): Promise<IZAlert[]>;

  /**
   * Returns an observable object that will stream in when the alert stack changes.
   *
   * You are responsible for unsubscribing from this observable once a subscription is
   * made.
   *
   * @returns An observable that streams in changes to the alert stack.
   */
  watch(): Observable<IZAlert[]>;

  /**
   * Retrieves an alert by its id.
   *
   * @param id The id of the alert to retrieve.
   *
   * @returns A resolved promise that resolves with the requested alert or
   *          a rejected promise if such an alert does not exist.
   */
  get(id: string): Promise<IZAlert>;

  /**
   * Creates a new global alert on the top of the alert stack.
   *
   * @param alert The alert to create.  The _id property on this
   *              alert is ignored.
   *
   * @returns The alert object that was created with the created id.
   */
  create(alert: IZAlert): Promise<IZAlert>;

  /**
   * Removes an alert from the system.
   *
   * @param id The id of the alert to remove.
   *
   * @returns A resolved promise that returns the alert that was removed, or
   *          a rejected promise if no such alert is on the stack.
   */
  remove(id: string): Promise<IZAlert>;

  /**
   * Removes all alerts from the service.
   *
   * @returns A promise that resolves when the list is cleared.
   */
  clear(): Promise<void>;
}

/**
 * Represents the service that manages global alert messages.
 */
export class ZAlertService implements IZAlertService {
  /**
   * The namespace that the alerts will be stored under in the global object.
   */
  public static readonly Namespace = 'zthunworks.alerts';

  /**
   * The property of where the alerts will be stored.
   */
  public static readonly PropertyAlerts = `${ZAlertService.Namespace}.list`;

  /**
   * The property of where the watcher will be stored.
   */
  public static readonly PropertyWatcher = `${ZAlertService.Namespace}.watcher`;

  /**
   * Initializes a new instance of this object.
   *
   * @param _max The maximum number of alerts that can be present on the stack.
   */
  public constructor(private _max: number = 5) {}

  /**
   * Gets the watcher for the alert changes.
   *
   * @returns The watcher for alert changes.
   */
  private static _getWatcher(): Subject<IZAlert[]> {
    let watcher: Subject<IZAlert[]> = get(global, ZAlertService.PropertyWatcher);

    if (!watcher) {
      set(global, ZAlertService.PropertyWatcher, new Subject<IZAlert[]>());
      watcher = get(global, ZAlertService.PropertyWatcher);
    }

    return watcher;
  }

  /**
   * Gets the current alert list.
   *
   * @returns The current alert list.
   */
  private static _getAlerts(): IZAlert[] {
    let alerts = get(global, ZAlertService.PropertyAlerts);

    if (!alerts) {
      ZAlertService._setAlerts([]);
      alerts = get(global, ZAlertService.PropertyAlerts);
    }

    return alerts.slice();
  }

  /**
   * Sets the alert list.
   *
   * @param alerts The alert list to set.
   */
  private static _setAlerts(alerts: IZAlert[]): void {
    set(global, ZAlertService.PropertyAlerts, alerts);
  }

  /**
   * Attempts to remove the alert from the global alert list.
   *
   * @param id The id of the alert to remove.
   *
   * @returns The alert that was removed, or null if no such alert
   *          exists.
   */
  private _tryRemove(id: string): IZAlert | null {
    const alerts = ZAlertService._getAlerts();
    const index = findIndex(alerts, (alert) => alert._id === id);

    if (index < 0) {
      return null;
    }

    const alert = alerts[index];
    alerts.splice(index, 1);
    ZAlertService._setAlerts(alerts);
    ZAlertService._getWatcher().next(alerts.slice());
    return alert;
  }

  /**
   * Retrieves the current state of the alert stack.
   *
   * @returns A promise that resolves with the current alert stack.
   */
  public all(): Promise<IZAlert[]> {
    const alerts = ZAlertService._getAlerts();
    return Promise.resolve(alerts);
  }

  /**
   * Returns an observable object that will stream in when the alert stack changes.
   *
   * You are responsible for unsubscribing from this observable once a subscription is
   * made.
   *
   * @returns An observable that streams in changes to the alert stack.
   */
  public watch(): Observable<IZAlert[]> {
    return ZAlertService._getWatcher().asObservable();
  }

  /**
   * Retrieves an alert by its id.
   *
   * @param id The id of the alert to retrieve.
   *
   * @returns A resolved promise that resolves with the requested alert or
   *          a rejected promise if such an alert does not exist.
   */
  public get(id: string): Promise<IZAlert> {
    const alerts = ZAlertService._getAlerts();

    const index = findIndex(alerts, (alert) => alert._id === id);

    if (index < 0) {
      return Promise.reject(new Error(`Unable to find alert with id, ${id}.`));
    }

    return Promise.resolve(alerts[index]);
  }

  /**
   * Creates a new global alert on the top of the alert stack.
   *
   * @param alert The alert to create.  The _id property on this
   *              alert is ignored.
   *
   * @returns The alert object that was created with the created id.
   */
  public create(alert: IZAlert): Promise<IZAlert> {
    const alerts = ZAlertService._getAlerts();

    while (alerts.length >= this._max) {
      alerts.pop();
    }

    alert = new ZAlertBuilder().copy(alert).id(v4()).build();
    alerts.splice(0, 0, alert);
    ZAlertService._setAlerts(alerts);
    ZAlertService._getWatcher().next(alerts.slice());

    if (alert.timeToLive > 0 && alert.timeToLive < Infinity) {
      setTimeout(() => this._tryRemove(alert._id), alert.timeToLive);
    }

    return Promise.resolve(new ZAlertBuilder().copy(alert).build());
  }

  /**
   * Removes an alert from the system.
   *
   * @param id The id of the alert to remove.
   *
   * @returns A resolved promise that returns the alert that was removed, or
   *          a rejected promise if no such alert is on the stack.
   */
  public remove(id: string): Promise<IZAlert> {
    const alert = this._tryRemove(id);

    if (alert === null) {
      return Promise.reject(new Error(`The alert with id, ${id}, does not exist.`));
    }

    return Promise.resolve(alert);
  }

  /**
   * Removes all alerts from the service.
   *
   * @returns A promise that resolves when the list is cleared.
   */
  public clear(): Promise<void> {
    const alerts = ZAlertService._getAlerts();

    if (alerts.length) {
      ZAlertService._setAlerts([]);
      ZAlertService._getWatcher().next([]);
    }

    return Promise.resolve();
  }
}
