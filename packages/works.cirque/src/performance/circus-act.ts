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

  public click: () => this = this._action.bind(this, ZCircusActionType.Click);
  public keysClick: (keys: string) => this = this._action.bind(this, ZCircusActionType.KeysClick);
  public magic: (action: () => Promise<any>) => this = this._action.bind(this, ZCircusActionType.Magic);

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
