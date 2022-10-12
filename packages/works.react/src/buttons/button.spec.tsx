/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */

import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import React, { ReactNode } from 'react';
import { ZButton } from './button';
import { ZButtonComponentModel } from './button.cm';

describe('ZButton', () => {
  const performer = new ZCircusPerformer();
  const waiter = new ZCircusWait();

  let avatar: ReactNode | undefined;
  let loading: boolean | undefined;
  let disabled: boolean | undefined;
  let outline: boolean | undefined;
  let onClick: jest.Mock | undefined;

  async function createTestTarget() {
    const element = (
      <ZButton
        avatar={avatar}
        disabled={disabled}
        loading={loading}
        outline={outline}
        onClick={onClick}
        label='ZButton-test-content'
      />
    );

    const result = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => !!ZButtonComponentModel.find(result.container).length);
    const [target] = ZButtonComponentModel.find(result.container);
    return new ZButtonComponentModel(target, performer);
  }

  beforeEach(() => {
    avatar = undefined;
    loading = undefined;
    outline = undefined;
    onClick = undefined;
  });

  describe('Content', () => {
    it('should render the button content', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.text();
      // Assert
      expect(actual).not.toBeNull();
    });
  });

  describe('Click', () => {
    beforeEach(() => {
      onClick = jest.fn();
    });

    it('should raise the onClick event when the button is clicked.', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.click();
      // Assert
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Disabled', () => {
    async function assertDisabled(expected: boolean, _disabled: boolean | undefined) {
      // Arrange
      disabled = _disabled;
      const target = await createTestTarget();
      // Act
      const actual = await target.disabled();
      // Assert
      expect(actual).toEqual(expected);
    }

    it('should disable the button when the disabled flag is true.', async () => {
      await assertDisabled(true, true);
    });

    it('should enable the button when the disabled flag is false.', async () => {
      await assertDisabled(false, false);
    });

    it('should enable the button when the disabled flag is undefined.', async () => {
      await assertDisabled(false, undefined);
    });
  });

  describe('Loading', () => {
    async function assertIsLoading(expected: boolean, _loading: boolean | undefined) {
      // Arrange
      loading = _loading;
      const target = await createTestTarget();
      // Act
      const actual = await target.loading();
      // Assert
      expect(!!actual).toEqual(expected);
    }

    it('should render the loader when true.', async () => {
      await assertIsLoading(true, true);
    });

    it('should not render loader when false.', async () => {
      await assertIsLoading(false, false);
    });

    it('should not render the loader when undefined.', async () => {
      await assertIsLoading(false, undefined);
    });
  });

  describe('Color', () => {
    async function assertOutline(expected: boolean, _outline: boolean | undefined) {
      // Arrange
      outline = _outline;
      const target = await createTestTarget();
      // Act
      const actual = await target.outlined();
      // Assert
      expect(!!actual).toEqual(expected);
    }

    it('should outline the button if the outline flag is true.', async () => {
      await assertOutline(true, true);
    });

    it('should contain the button if the outline flag is false.', async () => {
      await assertOutline(false, false);
    });

    it('should contain the button if the outline flag is undefined.', async () => {
      await assertOutline(false, undefined);
    });
  });
});
