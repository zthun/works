/* eslint-disable require-jsdoc */

import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React, { ReactNode } from 'react';
import { ZTextInput, ZTextType } from './text-input';
import { ZTextInputReveal } from './text-input-reveal';
import { ZTextComponentModel } from './text.cm';

describe('ZText', () => {
  let prefix: ReactNode | undefined;
  let suffix: ReactNode | undefined;
  let disabled: boolean | undefined;
  let required: boolean | undefined;
  let value: string | undefined;
  let onValueChange: jest.Mock | undefined;

  beforeEach(() => {
    value = undefined;
    onValueChange = undefined;

    disabled = undefined;
    required = undefined;

    prefix = undefined;
    suffix = undefined;
  });

  const shouldRenderTextValue = async (createTestTarget: () => Promise<ZTextComponentModel>) => {
    // Arrange
    value = 'My Value';
    const target = await createTestTarget();
    // Act
    const actual = await target.value();
    // Assert
    expect(actual).toEqual(value);
  };

  const shouldUpdateTextValue = async (createTestTarget: () => Promise<ZTextComponentModel>) => {
    // Arrange
    // cspell: disable-next-line
    const expected = 'Purus gravida quis blandit turpis cursus in hac habitasse.';
    const target = await createTestTarget();
    // Act
    await target.keyboard(expected);
    const actual = await target.value();
    // Assert
    expect(actual).toEqual(expected);
  };

  const shouldRaiseOnValueChange = async (createTestTarget: () => Promise<ZTextComponentModel>) => {
    // Arrange
    onValueChange = jest.fn();
    // cspell: disable-next-line
    const expected = 'Purus gravida quis blandit turpis cursus in hac habitasse.';
    const target = await createTestTarget();
    // Act
    await target.keyboard(expected);
    // Assert
    expect(onValueChange).toHaveBeenCalledWith(expected);
  };

  const shouldBeDisabled = async (createTestTarget: () => Promise<ZTextComponentModel>) => {
    // Arrange
    disabled = true;
    const target = await createTestTarget();
    // Act
    const actual = await target.disabled();
    // Assert
    expect(actual).toBeTruthy();
  };

  const shouldBeMasked = async (expected: boolean, createTestTarget: () => Promise<ZTextComponentModel>) => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = await target.masked();
    // Assert
    expect(actual).toEqual(expected);
  };

  const shouldBeRequired = async (createTestTarget: () => Promise<ZTextComponentModel>) => {
    // Arrange
    required = true;
    const target = await createTestTarget();
    // Act
    const actual = await target.required();
    // Assert
    expect(actual).toBeTruthy();
  };

  const shouldRenderPrefix = async (createTestTarget: () => Promise<ZTextComponentModel>) => {
    // Arrange
    const expected = 'ZText-prefix-content';
    prefix = <div className={expected}>Prefix</div>;
    const target = await createTestTarget();
    // Act
    const actual = await target.driver.select(`.${expected}`);
    // Assert
    expect(actual).toBeTruthy();
  };

  const shouldRenderSuffix = async (createTestTarget: () => Promise<ZTextComponentModel>) => {
    // Arrange
    const expected = 'ZText-suffix-content';
    suffix = <div className={expected}>Suffix</div>;
    const target = await createTestTarget();
    // Act
    const actual = await target.driver.select(`.${expected}`);
    // Assert
    expect(actual).toBeTruthy();
  };

  describe('Input', () => {
    async function createTestTarget(type?: ZTextType) {
      const element = (
        <ZTextInput
          type={type}
          value={value}
          disabled={disabled}
          required={required}
          prefix={prefix}
          suffix={suffix}
          onValueChange={onValueChange}
        />
      );
      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusComponentModel.create(driver, ZTextComponentModel, ZTextComponentModel.Selector);
    }

    it('should render the text value', async () => {
      await shouldRenderTextValue(createTestTarget);
    });

    it('should update the value as the user types', async () => {
      await shouldUpdateTextValue(createTestTarget);
    });

    it('should raise the onValueChange event when the user types a value', async () => {
      await shouldRaiseOnValueChange(createTestTarget);
    });

    it('should be disabled', async () => {
      await shouldBeDisabled(createTestTarget);
    });

    it('should be required', async () => {
      await shouldBeRequired(createTestTarget);
    });

    it('should render the prefix adornment', async () => {
      await shouldRenderPrefix(createTestTarget);
    });

    it('should render the suffix adornment', async () => {
      await shouldRenderSuffix(createTestTarget);
    });

    it('should have revealed text for a text type', async () => {
      await shouldBeMasked(false, createTestTarget.bind(null, ZTextType.Text));
    });

    it('should have masked text for a password type', async () => {
      await shouldBeMasked(true, createTestTarget.bind(null, ZTextType.Password));
    });

    it('should not render any adornments', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act.
      // Assert.
      await expect(target.driver.select('.ZText-adornment')).rejects.toBeTruthy();
    });

    it('should not be able to toggle revealed text', async () => {
      // Arrange.
      const target = await createTestTarget(ZTextType.Text);
      await target.reveal();
      // Act.
      const actual = await target.mask();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should not be able to toggle masked text', async () => {
      // Arrange.
      const target = await createTestTarget(ZTextType.Password);
      await target.mask();
      // Act.
      const actual = await target.reveal();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Reveal', () => {
    async function createTestTarget() {
      const element = (
        <ZTextInputReveal
          value={value}
          disabled={disabled}
          required={required}
          prefix={prefix}
          suffix={suffix}
          onValueChange={onValueChange}
        />
      );
      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusComponentModel.create(driver, ZTextComponentModel, ZTextComponentModel.Selector);
    }

    it('should render the text value', async () => {
      await shouldRenderTextValue(createTestTarget);
    });

    it('should update the value as the user types', async () => {
      await shouldUpdateTextValue(createTestTarget);
    });

    it('should raise the onValueChange event when the user types a value', async () => {
      await shouldRaiseOnValueChange(createTestTarget);
    });

    it('should be disabled', async () => {
      await shouldBeDisabled(createTestTarget);
    });

    it('should be required', async () => {
      await shouldBeRequired(createTestTarget);
    });

    it('should start as masked', async () => {
      await shouldBeMasked(true, createTestTarget);
    });

    it('should render the prefix adornment', async () => {
      await shouldRenderPrefix(createTestTarget);
    });

    it('should render the suffix adornment', async () => {
      await shouldRenderSuffix(createTestTarget);
    });

    it('should toggle the text from masked to revealed', async () => {
      // Arrange
      const target = await createTestTarget();
      await target.mask();
      // Act
      const actual = await target.reveal();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should toggle the text from revealed to masked', async () => {
      // Arrange
      const target = await createTestTarget();
      await target.reveal();
      // Act
      const actual = await target.mask();
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
