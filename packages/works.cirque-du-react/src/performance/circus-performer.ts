import { act } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { IZCircusAct, IZCircusAction, IZCircusPerformer, ZCircusActionType } from '@zthun/works.cirque';

/**
 * An implementation of an IZCircusPerformer that uses the @testing-library/react package.
 */
export class ZCircusPerformer implements IZCircusPerformer {
  /**
   * Performs the action.
   *
   * @param _act The act to perform.
   *
   * @returns
   *        A promise that resolves when the action is
   *        complete.
   */
  public perform(_act: IZCircusAct): Promise<void> {
    return act(() => {
      const user = UserEvent.setup();

      const dictionary: Record<ZCircusActionType, (a?: IZCircusAction) => any> = {
        [ZCircusActionType.MoveTo]: (a: IZCircusAction) => user.pointer({ target: a.context }),
        [ZCircusActionType.LeftMouseDown]: () => user.pointer('[MouseLeft>]'),
        [ZCircusActionType.LeftMouseUp]: () => user.pointer('[/MouseLeft]'),
        [ZCircusActionType.Magic]: (a: IZCircusAction) => a.context()
      };

      let promise = Promise.resolve();

      _act.actions.forEach((a) => {
        promise = promise.then(() => dictionary[a.name](a));
      });

      return promise;
    });
  }
}
