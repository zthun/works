import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/works.cirque';

export type ZHealthIndicatorState = 'loading' | 'healthy' | 'unhealthy';

/**
 * Represents a component model for the ZHealthIndicator.
 */
export class ZHealthIndicatorComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZHealthIndicator-root';

  /**
   * Gets whether the health indicator is loading.
   *
   * @returns
   *        True if the component is loading.
   */
  public loading(): Promise<boolean> {
    return this.driver.peek('.ZHealthIndicator-loading');
  }

  /**
   * Gets whether the health indicator is healthy.
   *
   * @returns
   *        True if the component is healthy.
   */
  public healthy(): Promise<boolean> {
    return this.driver.peek('.ZHealthIndicator-ok');
  }

  /**
   * Gets whether the health indicator is unhealthy.
   *
   * @returns
   *        True if the component is unhealthy.
   */
  public unhealthy(): Promise<boolean> {
    return this.driver.peek('.ZHealthIndicator-warn');
  }

  /**
   * Waits for this indicator to finish loading.
   *
   * @returns
   *        A promise that resolves once the indicator is no longer loading.
   */
  public load() {
    return this.driver.wait(() => this.loading().then((l) => !l));
  }

  /**
   * Clicks the indicator to refresh it.
   */
  public async refresh() {
    const act = new ZCircusActBuilder().click().build();
    await this.driver.perform(act);
  }
}
