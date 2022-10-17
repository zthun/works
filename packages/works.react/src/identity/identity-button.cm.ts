import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';
import { ZButtonComponentModel } from '../buttons/button.cm';

export type ZIdentityButtonState = 'authenticated' | 'unauthenticated' | 'loading';

/**
 * Represents a component model for the identity button.
 */
export class ZIdentityButtonComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element The button element that represents the identity button.
   * @param _performer The circus performer responsible for performing the click action.
   * @param _wait The circus wait implementation.
   */
  public constructor(
    private readonly _element: HTMLElement,
    private readonly _performer: IZCircusPerformer,
    private readonly _wait: IZCircusWait
  ) {}

  /**
   * Gets the underlying button component.
   *
   * @returns
   *        The component model for the button.
   */
  public async button(): Promise<ZButtonComponentModel> {
    const [candidate] = ZButtonComponentModel.find(this._element);
    const btn = await required(candidate);
    return new ZButtonComponentModel(btn, this._performer, this._wait);
  }

  /**
   * Gets whether the button is currently in the authenticated state.
   *
   * @returns
   *        True if the button is representing an authenticated state.
   */
  public authenticated() {
    return Promise.resolve(this._element.getAttribute('data-authenticated') === 'true');
  }

  /**
   * Attempts to find all elements in a container that can be identity button components.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        The list of elements that can be candidates for identity
   *        button components.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZIdentityButton-root'));
  }
}
