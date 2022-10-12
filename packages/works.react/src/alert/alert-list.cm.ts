import { IZCircusPerformer } from '@zthun/works.cirque';
import { IZAlert } from '@zthun/works.message';
import { ZAlertComponentModel } from './alert.cm';

/**
 * Represents a component model for the alert list.
 */
export class ZAlertListComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that represents the alert list component.
   * @param _performer
   *        The performer used to close individual alerts.
   */
  public constructor(private _element: HTMLElement, private _performer: IZCircusPerformer) {}

  /**
   * Gets a quick snapshot of the alerts in the current list.
   *
   * @returns
   *        The list of alerts in the current list.
   */
  public alerts(): Promise<ZAlertComponentModel[]> {
    const candidates = Array.from(this._element.querySelectorAll<HTMLElement>('.ZAlertList-alert'));
    return Promise.resolve(
      candidates.map((candidate) => candidate.getAttribute('data-alert-id') as string).map((id) => this._alert(id))
    );
  }

  /**
   * Same as alert, but synchronous.
   *
   * @param alertOrId
   *        The id of the alert to get the model for.
   *        If no alert with the given id exists, then
   *        a dead alert component model will be returned.
   *
   * @returns
   *        An alert component model for the given id.  This component
   *        model's alive property will be false if no such alert exists.
   */
  private _alert(alertOrId: IZAlert | string): ZAlertComponentModel {
    const id = typeof alertOrId === 'string' ? alertOrId : alertOrId._id;
    return new ZAlertComponentModel(this._element, id, this._performer);
  }

  /**
   * Returns the alert component model for a given id.
   *
   * @param alertOrId
   *        The id of the alert to get the model for.
   *        If no alert with the given id exists, then
   *        a dead alert component model will be returned.
   *
   * @returns
   *        An alert component model for the given id.  This component
   *        model's alive property will be false if no such alert exists.
   */
  public alert(alertOrId: IZAlert | string): Promise<ZAlertComponentModel> {
    return Promise.resolve(this._alert(alertOrId));
  }

  /**
   * Closes an individual alert.
   *
   * @param alertOrId
   *        The alert component to close or the id of the alert to
   *        close.
   */
  public async close(alertOrId: ZAlertComponentModel | IZAlert | string): Promise<void> {
    const factory = alertOrId instanceof ZAlertComponentModel ? Promise.resolve(alertOrId) : this.alert(alertOrId);

    const alert = await factory;
    await alert.close();
  }

  /**
   * Searches for the alert list.
   *
   * <p>
   * The alert list is normally global and there is usually only one of them.
   * </p>
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        A list of elements that can represent a ZAlertList component.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZAlertList-root'));
  }
}
