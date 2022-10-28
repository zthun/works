/* eslint-disable valid-jsdoc */

import { fireEvent, RenderResult, waitFor } from '@testing-library/react/pure';
import UserEvent from '@testing-library/user-event';
import { IZCircusAct, IZCircusAction, IZCircusDriver, ZCircusActionType, ZCircusKey } from '@zthun/works.cirque';
import { get, keyBy } from 'lodash';

/**
 * Represents a circus driver that wraps an html element.
 */
export class ZCircusDriver implements IZCircusDriver {
  /**
   * Initializes a new instance of this object.
   *
   * @param _result
   *        The render result.
   * @param _element
   *        The element to wrap.
   */
  public constructor(private _result: RenderResult, private _element: HTMLElement) {}

  /**
   * Flushes an event loop.
   */
  private _flush(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1));
  }

  /**
   * Destroys the render session.
   */
  public async destroy() {
    this._result.unmount();
    await this._flush();
  }

  /**
   * @inheritdoc
   */
  public attribute(attribute: string): Promise<string | null> {
    return Promise.resolve(this._element.getAttribute(attribute));
  }

  /**
   * @inheritdoc
   */
  public tag(): Promise<string> {
    return Promise.resolve(this._element.nodeName);
  }

  /**
   * @inheritdoc
   */
  public classes(filter?: string[]): Promise<string[]> {
    const list = this._element.classList;
    const all = Array.from(list);
    const _filter = filter == null ? all : filter;
    const lookup = keyBy(_filter);
    const filtered = all.filter((c) => Object.prototype.hasOwnProperty.call(lookup, c));
    return Promise.resolve(filtered);
  }

  /**
   * @inheritdoc
   */
  public text(): Promise<string> {
    return Promise.resolve(this._element.textContent || '');
  }

  /**
   * @inheritdoc
   */
  public value(): Promise<string | null> {
    return Promise.resolve(get(this._element, 'value', null));
  }

  /**
   * @inheritdoc
   */
  public async input(val?: string): Promise<string | null> {
    fireEvent.change(this._element, { target: { value: val } });
    await this._flush();
    fireEvent.input(this._element, { target: { value: val } });
    await this._flush();
    return (this._element as any).value;
  }

  /**
   * @inheritdoc
   */
  public selected(): Promise<boolean> {
    return Promise.resolve(get(this._element, 'checked', false));
  }

  /**
   * @inheritdoc
   */
  public disabled(): Promise<boolean> {
    return Promise.resolve(get(this._element, 'disabled', false));
  }

  /**
   * @inheritdoc
   */
  public peek(selector: string): Promise<boolean> {
    return Promise.resolve(!!this._element.querySelector(selector));
  }

  /**
   * @inheritdoc
   */
  public query(selector: string): Promise<IZCircusDriver[]> {
    const elements = Array.from(this._element.querySelectorAll<HTMLElement>(selector));
    return Promise.resolve(elements.map((e) => new ZCircusDriver(this._result, e)));
  }

  /**
   * @inheritdoc
   */
  public body(): Promise<IZCircusDriver> {
    return Promise.resolve(new ZCircusDriver(this._result, document.body));
  }

  /**
   * @inheritdoc
   */
  public async select(selector: string): Promise<IZCircusDriver> {
    const drivers = await this.query(selector);

    if (!drivers.length) {
      return Promise.reject(`No element with selector, ${selector}, could be found.`);
    }

    return drivers[0];
  }

  /**
   * @inheritdoc
   */
  public async perform(act: IZCircusAct): Promise<void> {
    const user = UserEvent.setup();

    const dictionary: Record<ZCircusActionType, (a?: IZCircusAction) => any> = {
      [ZCircusActionType.MouseLeftDown]: () => user.pointer({ keys: '[MouseLeft>]', target: this._element }),
      [ZCircusActionType.MouseLeftUp]: () => user.pointer({ keys: '[/MouseLeft]', target: this._element }),
      [ZCircusActionType.MouseRightDown]: () => user.pointer({ keys: '[MouseRight>]', target: this._element }),
      [ZCircusActionType.MouseRightUp]: () => user.pointer({ keys: '[/MouseRight]', target: this._element }),
      [ZCircusActionType.KeyDown]: (a: IZCircusAction<ZCircusKey>) => user.keyboard(`[${a.context.code}>]`),
      [ZCircusActionType.KeyUp]: (a: IZCircusAction<ZCircusKey>) => user.keyboard(`[/${a.context.code}]`),
      [ZCircusActionType.Magic]: (a: IZCircusAction<() => any>) => a.context()
    };

    let promise = Promise.resolve();

    act.actions.forEach((a) => {
      promise = promise.then(() => dictionary[a.name](a));
    });

    await promise;
    await this._flush();
  }

  /**
   * @inheritdoc
   */
  public wait(predicate: () => boolean | Promise<boolean>): Promise<void> {
    return waitFor(async () => {
      const result = await predicate();
      return result ? Promise.resolve() : Promise.reject();
    });
  }
}
