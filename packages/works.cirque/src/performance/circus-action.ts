export enum ZCircusActionType {
  // Mouse Actions
  MouseDown = 'mouse-down',
  MouseUp = 'mouse-up',
  // Keyboard Actions
  KeyDown = 'key-down',
  KeyUp = 'key-up',
  // Custom Actions
  Magic = 'magic'
}

export interface IZCircusAction<TContext = any> {
  name: ZCircusActionType;
  context: TContext;
}

/**
 * Gets whether an action represents a keyboard action.
 *
 * @param action
 *        The action or action type to check.
 *
 * @returns
 *        True if the action represents a key down or key up event.
 *        False otherwise.
 */
export function isKeyboardAction(action: IZCircusAction) {
  const { name } = action;
  return [ZCircusActionType.KeyDown, ZCircusActionType.KeyUp].indexOf(name) >= 0;
}

/**
 * Gets whether an action represents a mouse action.
 *
 * @param action
 *        The action or action type to check.
 *
 * @returns
 *        True if the action represents a mouse event.
 */
export function isMouseAction(action: IZCircusAction) {
  const { name } = action;
  return [ZCircusActionType.MouseDown, ZCircusActionType.MouseUp].indexOf(name) >= 0;
}
