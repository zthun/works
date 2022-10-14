import { IZCircusPerformer, IZCircusWait, ZCircusActBuilder } from '@zthun/works.cirque';

export type ZHealthIndicatorState = 'loading' | 'healthy' | 'unhealthy';

/**
 * Represents a component model for the ZHealthIndicator.
 */
export class ZHealthIndicatorComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The container element.
   * @param _performer
   *        The performer responsible for performing actions.
   * @param _waiter
   *        The object responsible for waiting for conditions.
   */
  public constructor(
    private readonly _element: HTMLElement,
    private readonly _performer: IZCircusPerformer,
    private readonly _waiter: IZCircusWait
  ) {}

  /**
   * Gets whether the health indicator is loading.
   *
   * @returns
   *        True if the component is loading, false otherwise.
   */
  private _ready() {
    return this._element.querySelector('.ZHealthIndicator-loading') == null;
  }

  /**
   * Checks the indicator to see if it's in the specific state.
   *
   * @param state
   *        The state to check.
   *
   * @returns
   *        True if this button is currently in the given state,
   *        false otherwise.
   */
  private async _isState(state: ZHealthIndicatorState) {
    const _state = await this.state();
    return _state === state;
  }

  /**
   * Gets the current state of the indicator.
   *
   * @returns
   *        The state that the indicator is currently in.
   */
  public async state(): Promise<ZHealthIndicatorState> {
    if (!this._ready()) {
      return 'loading';
    }

    return this._element.querySelector('.ZHealthIndicator-ok') ? 'healthy' : 'unhealthy';
  }

  /**
   * Gets whether the health indicator is loading.
   *
   * @returns
   *        True if the component is loading.
   */
  public loading: () => Promise<boolean> = this._isState.bind(this, 'loading');

  /**
   * Gets whether the health indicator is healthy.
   *
   * @returns
   *        True if the component is healthy.
   */
  public healthy: () => Promise<boolean> = this._isState.bind(this, 'healthy');

  /**
   * Gets whether the health indicator is unhealthy.
   *
   * @returns
   *        True if the component is unhealthy.
   */
  public unhealthy: () => Promise<boolean> = this._isState.bind(this, 'unhealthy');

  /**
   * Waits for this indicator to finish loading.
   */
  public async load() {
    await this._waiter.wait(() => this._ready());
  }

  /**
   * Clicks the indicator to refresh it.
   */
  public async refresh() {
    const act = new ZCircusActBuilder().moveTo(this._element).leftMouseClick().build();
    await this._performer.perform(act);
  }

  /**
   * Searches for elements that can be ZHealthIndicator components.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        All elements that are candidates to be ZHealthIndicator components.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZHealthIndicator-root'));
  }
}
