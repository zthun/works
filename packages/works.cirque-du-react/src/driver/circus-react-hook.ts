/* eslint-disable valid-jsdoc */
import { RenderHookResult } from '@testing-library/react';

/**
 * Represents a driver for a react hook.
 */
export interface IZCircusReactHook<T, P> {
  /**
   * Destroys the hook.
   */
  destroy(): Promise<void>;

  /**
   * Returns the current state of the data.
   *
   * @returns
   *        The current value.
   */
  current(): Promise<T>;

  /**
   * Rerenders the underlying hook and gives the results.
   *
   * @returns
   *        The current value after the render.
   */
  rerender(props?: P): Promise<T>;
}

/**
 * An implementation of an IZReactHook that wraps the result from
 * @testing-library/react.
 */
export class ZCircusReactHook<T, P> implements IZCircusReactHook<T, P> {
  /**
   * Initializes a new instance of this object.
   *
   * @param _result
   *        The render result.
   */
  public constructor(private _result: RenderHookResult<T, P>) {}

  /**
   * @inheritdoc
   */
  public destroy(): Promise<void> {
    this._result.unmount();
    return new Promise((resolve) => setTimeout(resolve, 1));
  }

  /**
   * @inheritdoc
   */
  public current(): Promise<T> {
    return Promise.resolve(this._result.result.current);
  }

  /**
   * @inheritdoc
   */
  public async rerender(props?: P): Promise<T> {
    this._result.rerender(props);
    await new Promise((resolve) => setTimeout(resolve, 1));
    return this.current();
  }
}
