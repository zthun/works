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
   * @param name
   *        The action name.
   * @param context
   *        The action context.
   *
   * @returns
   *        This object.
   */
  private _action(name: ZCircusActionType, context?: any) {
    this._actions.push({ name, context });
    return this;
  }

  public moveTo: (element?: Element) => this = this._action.bind(this, ZCircusActionType.MoveTo);
  public leftMouseDown: () => this = this._action.bind(this, ZCircusActionType.LeftMouseDown);
  public leftMouseUp: () => this = this._action.bind(this, ZCircusActionType.LeftMouseUp);
  public keysClick: (keys: string) => this = this._action.bind(this, ZCircusActionType.KeysClick);
  public keysPress: (keys: string) => this = this._action.bind(this, ZCircusActionType.KeysPress);
  public keysRelease: (keys: string) => this = this._action.bind(this, ZCircusActionType.KeysRelease);
  public magic: (action: () => Promise<any>) => this = this._action.bind(this, ZCircusActionType.Magic);

  /**
   * Alias to leftMouseDown + leftMouseUp
   *
   * @returns
   *      This object.
   */
  public leftMouseClick(): this {
    return this.leftMouseDown().leftMouseUp();
  }

  /**
   * Alias to moveTo + leftMouseClick
   *
   * @param element
   *        The element to click.
   *
   * @returns
   *        This object.
   */
  public click(element?: Element) {
    return this.moveTo(element).leftMouseClick();
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
