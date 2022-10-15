import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { ZButtonComponentModel } from '../buttons/button.cm';

/**
 * Represents the component model for the ZWebAppHomeButton.
 */
export class ZWebAppHomeButtonComponentModel {
  private readonly _button: ZButtonComponentModel;

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
    private readonly _element: HTMLButtonElement,
    readonly _performer: IZCircusPerformer,
    readonly _waiter: IZCircusWait
  ) {
    this._button = new ZButtonComponentModel(_element, _performer, _waiter);
  }

  /**
   * Gets whether the button is loading the web application.
   *
   * @returns
   *        True if the home button is loading.  False otherwise.
   */
  public async loading(): Promise<boolean> {
    return this._button.loading();
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
   * Waits for the loading to complete.
   *
   * @returns A promise that resolves once the button is ready.
   */
  public load(): Promise<void> {
    return this._button.load();
  }

  /**
   * Clicks the button.
   *
   * @returns A promise that resolves once the button is clicked.
   */
  public navigate(): Promise<void> {
    return this._button.click();
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
