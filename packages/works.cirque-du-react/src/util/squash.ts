/* eslint-disable require-jsdoc */
import {
  isKeyboardAction,
  isMouseAction,
  IZCircusAct,
  IZCircusAction,
  IZCircusKey,
  ZCircusActBuilder,
  ZCircusActionType,
  ZCircusKeyboardQwerty
} from '@zthun/works.cirque';

interface KeyboardState {
  leftShift: boolean;
  rightShift: boolean;
  caps: boolean;
}

function squashKeyboardEvents(user: any, range: IZCircusAction[], state: KeyboardState): IZCircusAction {
  const chain: string[] = [];

  for (let i = 0; i < range.length; ++i) {
    const stepAction = range[i];
    const nextAction = range[i + 1];

    const key = stepAction.context as IZCircusKey;
    const nextKey = nextAction?.context as IZCircusKey;

    const isUpperCase = state.caps || state.leftShift || state.rightShift;
    const value = isUpperCase ? stepAction.context.upper : stepAction.context.lower;

    if (
      stepAction.name === ZCircusActionType.KeyDown &&
      nextAction?.name === ZCircusActionType.KeyUp &&
      key.code === nextKey?.code &&
      key.printable
    ) {
      chain.push(value);
      ++i;
      continue;
    }

    chain.push(stepAction.name === ZCircusActionType.KeyDown ? `{${value}>}` : `{/${value}}`);

    if (stepAction.name === ZCircusActionType.KeyDown && key.code === ZCircusKeyboardQwerty.capsLock.code) {
      state.caps = !state.caps;
    }

    if (stepAction.name === ZCircusActionType.KeyDown && key.code === ZCircusKeyboardQwerty.shiftLeft.code) {
      state.leftShift = true;
    }

    if (stepAction.name === ZCircusActionType.KeyUp && key.code === ZCircusKeyboardQwerty.shiftLeft.code) {
      state.leftShift = false;
    }

    if (stepAction.name === ZCircusActionType.KeyDown && key.code === ZCircusKeyboardQwerty.shiftRight.code) {
      state.rightShift = true;
    }

    if (stepAction.name === ZCircusActionType.KeyUp && key.code === ZCircusKeyboardQwerty.shiftRight.code) {
      state.rightShift = false;
    }
  }

  const name = ZCircusActionType.Magic;
  const context = () => user.keyboard(chain.join(''));

  return { name, context };
}

export function squash(user: any, act: IZCircusAct, element: HTMLElement): IZCircusAct {
  let newAct = new ZCircusActBuilder();
  const state: KeyboardState = { leftShift: false, rightShift: false, caps: false };

  for (let i = 0; i < act.actions.length; ++i) {
    const action = act.actions[i];

    if (isKeyboardAction(action)) {
      let end = i;
      for (end; end < act.actions.length && isKeyboardAction(act.actions[end]); ++end);
      const range = act.actions.slice(i, end);
      newAct = newAct.action(squashKeyboardEvents(user, range, state));
      i = end;
      continue;
    }

    if (isMouseAction(action)) {
      // Mouse actions work properly in user-events.
      switch (action.name) {
        case ZCircusActionType.MouseLeftUp:
          newAct = newAct.magic(() => user.pointer({ keys: '[/MouseLeft]', target: element }));
          break;
        case ZCircusActionType.MouseRightDown:
          newAct = newAct.magic(() => user.pointer({ keys: '[MouseRight>]', target: element }));
          break;
        case ZCircusActionType.MouseRightUp:
          newAct = newAct.magic(() => user.pointer({ keys: '[/MouseRight]', target: element }));
          break;
        default:
          newAct = newAct.magic(() => user.pointer({ keys: '[MouseLeft>]', target: element }));
          break;
      }
      continue;
    }

    newAct.action(action);
  }

  return newAct.build();
}
