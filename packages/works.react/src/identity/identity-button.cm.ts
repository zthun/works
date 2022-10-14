import { IZCircusPerformer, IZCircusWait, ZCircusActBuilder } from '@zthun/works.cirque';
import { get } from 'lodash';

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
   * Gets the ready state of the button (IE. Not loading)
   *
   * @returns
   *        True if this button is not loading, false otherwise.
   */
  private _ready() {
    return !this._element.classList.contains('ZIdentityButton-loading');
  }

  /**
   * Gets the current state of the button.
   *
   * @returns
   *        The state that the button is currently in.
   */
  public async state(): Promise<ZIdentityButtonState> {
    if (!this._ready()) {
      return 'loading';
    }

    return this._element.classList.contains('ZIdentityButton-profile') ? 'authenticated' : 'unauthenticated';
  }

  /**
   * Gets whether this button is disabled.
   *
   * @returns
   *        True if the button is disabled.  False otherwise.
   *        This returns true if the button is loading.
   */
  public async disabled(): Promise<boolean> {
    return get(this._element, 'disabled', true);
  }

  /**
   * Checks the button to see if it's in the specific state.
   *
   * @param state
   *        The state to check.
   *
   * @returns
   *        True if this button is currently in the given state,
   *        false otherwise.
   */
  private async _isState(state: ZIdentityButtonState) {
    const _state = await this.state();
    return _state === state;
  }

  /**
   * Gets whether the button is currently loading the users profile information.
   *
   * @returns
   *        True if the state is in the loading state.
   */
  public loading: () => Promise<boolean> = this._isState.bind(this, 'loading');

  /**
   * Gets whether the button is currently loading the users profile information.
   *
   * @returns
   *        True if the state is in the loading state.
   */
  public authenticated: () => Promise<boolean> = this._isState.bind(this, 'authenticated');

  /**
   * Gets whether the button is currently loading the users profile information.
   *
   * @returns
   *        True if the state is in the loading state.
   */
  public unauthenticated: () => Promise<boolean> = this._isState.bind(this, 'unauthenticated');

  /**
   * Waits for this button to finish loading the current profile.
   */
  public async load() {
    await this._wait.wait(() => this._ready());
  }

  /**
   * Clicks the button.
   */
  public async click() {
    const act = new ZCircusActBuilder().moveTo(this._element).leftMouseClick().build();
    await this._performer.perform(act);
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
