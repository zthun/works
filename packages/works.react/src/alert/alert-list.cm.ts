import { ZCircusComponentModel } from '@zthun/works.cirque';
import { IZAlert } from '@zthun/works.message';
import { ZAlertComponentModel } from './alert.cm';

/**
 * Represents a component model for the alert list.
 */
export class ZAlertListComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZAlertList-root';

  /**
   * Gets a quick snapshot of the alerts in the current list.
   *
   * @returns
   *        The list of alerts in the current list.
   */
  public async alerts(): Promise<ZAlertComponentModel[]> {
    const candidates = await this.driver.query('.ZAlertList-alert');
    const ids = await Promise.all(candidates.map((c) => c.attribute('data-alert-id')));
    return Promise.all(ids.map((id) => id as string).map((id) => this.alert(id)));
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
   *        An alert component model for the given id.
   */
  public alert(alertOrId: IZAlert | string): Promise<ZAlertComponentModel> {
    const id = typeof alertOrId === 'string' ? alertOrId : alertOrId._id;
    return Promise.resolve(new ZAlertComponentModel(this.driver, id));
  }
}
