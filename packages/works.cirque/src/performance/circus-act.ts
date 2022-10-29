import { IZCircusKey } from '../keyboard/circus-key';
import { ZCircusKeyTranslator } from '../keyboard/circus-key-translator';
import { ZCircusKeyboardQwerty } from '../keyboard/circus-keyboard-qwerty';
import { IZCircusAction, ZCircusActionType } from './circus-action';

/**
 * Represents an ordered act in a circus.
 */
export interface IZCircusAct {
  /**
   * The list of actions to perform for the act.
   */
  actions: IZCircusAction[];
}

/**
 * A builder for a circus act.
 */
export class ZCircusActBuilder {
  private _actions: IZCircusAction[] = [];

  /**
   * Appends an action.
   *
   * @param action
   *        The action to append.
   *
   * @returns
   *        This object.
   */
  public action(action: IZCircusAction): this {
    this._actions.push({ ...action });
    return this;
  }

  /**
   * Appends an action.
   *
   * @param name
   *        The action name.
   * @param context
   *        The action context.
   *
   * @returns
   *        This object.
   */
  private _action(name: ZCircusActionType, context?: any): this {
    return this.action({ name, context });
  }

  public keyDown: (key: IZCircusKey) => this = this._action.bind(this, ZCircusActionType.KeyDown);
  public keyUp: (key: IZCircusKey) => this = this._action.bind(this, ZCircusActionType.KeyUp);

  public leftMouseDown: () => this = this._action.bind(this, ZCircusActionType.MouseLeftDown);
  public leftMouseUp: () => this = this._action.bind(this, ZCircusActionType.MouseLeftUp);

  public magic: (action: () => Promise<any>) => this = this._action.bind(this, ZCircusActionType.Magic);

  /**
   * Presses a key on the keyboard.
   *
   * @param key
   *        The key to press.
   *
   * @returns
   *        This object.
   */
  public press(key: IZCircusKey) {
    return this.keyDown(key).keyUp(key);
  }

  /**
   * Types a string of characters.
   *
   * You will only really be able to put strings of single digit characters
   * into this, so special characters will be handled as individual chars.
   *
   * @param keys
   *        The keys to press as a string.
   *
   * @returns
   *        This object.
   */
  public type(keys: string): this {
    const qwerty = ZCircusKeyTranslator.Qwerty;

    for (const key of keys) {
      const k = qwerty.translate(key);

      if (key === k?.upper && key !== k?.lower) {
        this.keyDown(ZCircusKeyboardQwerty.shiftLeft).press(k).keyUp(ZCircusKeyboardQwerty.shiftLeft);
      } else if (k != null) {
        this.press(k);
      }
    }

    return this;
  }

  /**
   * Clicks the left mouse button.
   *
   * @returns
   *        This object.
   */
  public click() {
    return this.leftMouseDown().leftMouseUp();
  }

  /**
   * Builds the circus act.
   *
   * @returns The built act.
   */
  public build(): IZCircusAct {
    return {
      actions: this._actions.slice()
    };
  }
}
