import { IZCircusPerformer, IZCircusWait, ZCircusActBuilder } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';

/**
 * Represents the component model for a button element.
 */
export class ZButtonComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that represents the button.
   * @param _performer
   *        The circus performer responsible for clicking the button.
   * @param _waiter
   *        The circus waiter to wait for specific conditions.
   */
  public constructor(
    private _element: HTMLButtonElement,
    private _performer: IZCircusPerformer,
    private _waiter: IZCircusWait
  ) {}

  /**
   * Gets whether the button is in the loading state.
   *
   * @returns
   *        True if the button is in the loading state.  False otherwise.
   */
  private _loading() {
    return !!this._element.querySelector('.ZCircularProgress-root');
  }

  /**
   * Gets whether the button is in the loading state.
   *
   * @returns
   *        True if the button is in the loading state.  False otherwise.
   */
  public loading(): Promise<boolean> {
    return Promise.resolve(this._loading());
  }

  /**
   * Gets whether the button is disabled.
   *
   * @returns
   *        True if the button is disabled.  False otherwise.
   */
  public disabled(): Promise<boolean> {
    return Promise.resolve(this._element.disabled);
  }

  /**
   * Gets whether the button is outlined.
   *
   * @returns
   *        True if the button is outlined.  False otherwise.
   */
  public outlined(): Promise<boolean> {
    return Promise.resolve(this._element.classList.contains('ZButton-outline'));
  }

  /**
   * Gets whether the button is borderless.
   *
   * @returns
   *        True if the button is borderless.  False otherwise.
   */
  public borderless(): Promise<boolean> {
    return Promise.resolve(this._element.classList.contains('ZButton-borderless'));
  }

  /**
   * Gets the button content text, if any.
   *
   * @returns
   *        The button content text, if any.
   */
  public async text(): Promise<string | null> {
    const content = await required(this._element.querySelector<HTMLElement>('.ZButton-content'));
    return content.textContent;
  }

  /**
   * Clicks the button.
   *
   * @returns A promise that resolves when the button is clicked.
   */
  public click(): Promise<void> {
    const act = new ZCircusActBuilder().moveTo(this._element).leftMouseClick().build();
    return this._performer.perform(act);
  }

  /**
   * Waits for the loading indicator to go away.
   *
   * @returns
   *        A promise that resolves once the button is ready.
   */
  public load(): Promise<void> {
    return this._waiter.wait(() => !this._loading());
  }

  /**
   * Finds all button components on the page.
   *
   * @param container
   *        The container to search for.
   *
   * @returns
   *        The list of components that can be considered ZButton components.
   */
  public static find(container: HTMLElement): HTMLButtonElement[] {
    return Array.from(container.querySelectorAll<HTMLButtonElement>('.ZButton-root'));
  }
}
