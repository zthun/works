import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZLinkComponentModel } from './link.cm';

/**
 * Represents a component model a ZBreadcrumbs component.
 */
export class ZBreadcrumbsComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBreadcrumbs-root';

  /**
   * Gets the breadcrumbs underneath the path structure.
   *
   * @returns
   *        The list of breadcrumb items.
   */
  public async items(): Promise<ZLinkComponentModel[]> {
    return (await this.driver.query('.ZBreadcrumbs-item')).map((item) => new ZLinkComponentModel(item));
  }

  /**
   * Gets an item by its name or href.
   *
   * @param name
   *        The name (path) of the link
   *
   * @returns
   *        The link with the given name or href, or null if
   *        no such breadcrumb is found.
   */
  public async item(name: string): Promise<ZLinkComponentModel | null> {
    const [item] = await this.driver.query(`.ZBreadcrumbs-item[data-name="${name}"]`);
    return item ? new ZLinkComponentModel(item) : null;
  }
}
