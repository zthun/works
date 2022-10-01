/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ZCircusActBuilder } from '@zthun/works.cirque';
import React from 'react';
import { ZCircusSetupRender } from '../setup/circus-setup-render';
import { ZCircusPerformer } from './circus-performer';

describe('ZCircusPerformer', () => {
  function createTestTarget() {
    return new ZCircusPerformer();
  }

  async function assertElementEventRaised(
    expected: jest.Mock,
    render: () => Promise<HTMLElement>,
    buildAct: (e: HTMLElement) => ZCircusActBuilder
  ) {
    // Arrange.
    const target = createTestTarget();
    const element = await render();
    const act = buildAct(element);
    // Act.
    await target.perform(act.build());
    // Assert.
    expect(expected).toHaveBeenCalled();
  }

  describe('Pointer', () => {
    let onMouseOver: jest.Mock;
    let onMouseDown: jest.Mock;
    let onMouseUp: jest.Mock;
    let onClick: jest.Mock;

    async function createPointerTestRender() {
      const jsx = (
        <button
          type='button'
          onMouseDown={onMouseDown}
          onClick={onClick}
          onMouseUp={onMouseUp}
          onMouseOver={onMouseOver}
        />
      );
      const rendered = await new ZCircusSetupRender(jsx).setup();
      return rendered.container.querySelector<HTMLElement>('button')!;
    }

    beforeEach(() => {
      onMouseOver = jest.fn();
      onMouseDown = jest.fn();
      onMouseUp = jest.fn();
      onClick = jest.fn();
    });

    it('should move over the button', async () => {
      await assertElementEventRaised(onMouseOver, createPointerTestRender, (e) => new ZCircusActBuilder().moveTo(e));
    });

    it('should click and hold the left mouse button', async () => {
      await assertElementEventRaised(onMouseDown, createPointerTestRender, (e) =>
        new ZCircusActBuilder().moveTo(e).leftMouseDown()
      );
    });

    it('should release the left mouse button', async () => {
      await assertElementEventRaised(onMouseUp, createPointerTestRender, (e) =>
        new ZCircusActBuilder().moveTo(e).leftMouseDown().leftMouseUp()
      );
    });

    it('should click the the left mouse button', async () => {
      await assertElementEventRaised(onClick, createPointerTestRender, (e) =>
        new ZCircusActBuilder().moveTo(e).leftMouseClick()
      );
    });
  });
});
