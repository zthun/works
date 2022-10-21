/* eslint-disable valid-jsdoc */

import { RenderResult, waitFor } from '@testing-library/react/pure';
import UserEvent from '@testing-library/user-event';
import { IZCircusAct, IZCircusAction, IZCircusDriver, ZCircusActionType } from '@zthun/works.cirque';
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
   * Destroys the render session.
   */
  public async destroy() {
    this._result.unmount();
    await new Promise((resolve) => setTimeout(resolve, 1));
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
  public text(): Promise<string | null> {
    return Promise.resolve(this._element.textContent);
  }

  /**
   * @inheritdoc
   */
  public value(): Promise<string | null> {
    return Promise.resolve(get(this._element, 'value', null));
  }

  /**
   * @Inheritdoc
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
      [ZCircusActionType.MoveTo]: () => user.pointer({ target: this._element }),
      [ZCircusActionType.LeftMouseDown]: () => user.pointer({ keys: '[MouseLeft>]', target: this._element }),
      [ZCircusActionType.LeftMouseUp]: () => user.pointer({ keys: '[/MouseLeft]', target: this._element }),
      [ZCircusActionType.KeysClick]: (a: IZCircusAction) => user.keyboard(a.context),
      [ZCircusActionType.KeysPress]: (a: IZCircusAction) => user.keyboard(`{${a.context}>}`),
      [ZCircusActionType.KeysRelease]: (a: IZCircusAction) => user.keyboard(`{/${a.context}}`),
      [ZCircusActionType.Magic]: (a: IZCircusAction) => a.context()
    };

    let promise = Promise.resolve();

    act.actions.forEach((a) => {
      promise = promise.then(() => dictionary[a.name](a));
    });

    await promise;
    // Flush the queue
    return new Promise((resolve) => setTimeout(resolve, 1));
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
