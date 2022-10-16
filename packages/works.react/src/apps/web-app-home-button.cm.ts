import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';
import { ZButtonComponentModel } from '../buttons/button.cm';

/**
 * Represents the component model for the ZWebAppHomeButton.
 */
export class ZWebAppHomeButtonComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that represents the button.
   * @param _performer
   *        The performer responsible for clicking the button.
   * @param _waiter
   *        The waiter responsible for waiting for load states.
   */
  public constructor(
    private readonly _element: HTMLElement,
    private readonly _performer: IZCircusPerformer,
    private readonly _waiter: IZCircusWait
  ) {}

  /**
   * Gets the underlying button component.
   *
   * @returns
   *      The underlying button component.
   */
  public async button(): Promise<ZButtonComponentModel> {
    const clasz = '.ZWebAppHomeButton-button';
    const btn = await required(this._element.querySelector<HTMLButtonElement>(clasz));
    return new ZButtonComponentModel(btn, this._performer, this._waiter);
  }

  /**
   * Gets the app name.
   *
   * @returns
   *        The app name.
   */
  public async name(): Promise<string | null | undefined> {
    return this._element.querySelector('.ZWebAppHomeButton-name')?.textContent;
  }

  /**
   * Gets the description text.
   *
   * @returns
   *        The description text.
   */
  public async description(): Promise<string | null | undefined> {
    return this._element.querySelector('.ZWebAppHomeButton-description')?.textContent;
  }

  /**
   * Finds all elements in the container that can be considered ZWebAppHomeButton components.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        The list of elements that are candidates for ZWebAppHomeButton components.
   */
  public static find(container: HTMLElement): HTMLButtonElement[] {
    return Array.from(container.querySelectorAll<HTMLButtonElement>('.ZWebAppHomeButton-root'));
  }
}
