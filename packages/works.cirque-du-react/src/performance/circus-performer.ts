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
   */
  public async perform(_act: IZCircusAct): Promise<void> {
    const user = UserEvent.setup();

    const dictionary: Record<ZCircusActionType, (a?: IZCircusAction) => any> = {
      [ZCircusActionType.MoveTo]: (a: IZCircusAction) => user.pointer({ target: a.context }),
      [ZCircusActionType.LeftMouseDown]: () => user.pointer('[MouseLeft>]'),
      [ZCircusActionType.LeftMouseUp]: () => user.pointer('[/MouseLeft]')
    };

    await act(async () => {
      let promise = Promise.resolve();

      _act.actions.forEach((a) => {
        promise = promise.then(() => dictionary[a.name](a));
      });

      await promise;
    });
  }
}
