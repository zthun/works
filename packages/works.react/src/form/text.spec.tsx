import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZTextInput } from './text-input';
import { ZTextComponentModel } from './text.cm';

/* eslint-disable require-jsdoc */
describe('ZText', () => {
  let value: string | undefined;
  let onValueChange: jest.Mock | undefined;

  beforeEach(() => {
    value = undefined;
    onValueChange = undefined;
  });

  describe('Input', () => {
    async function createTestTarget() {
      const element = <ZTextInput value={value} onValueChange={onValueChange} />;
      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusComponentModel.create(driver, ZTextComponentModel, ZTextComponentModel.Selector);
    }

    it('should render the text value', async () => {
      // Arrange.
      value = 'My Value';
      const target = await createTestTarget();
      // Act.
      const actual = await target.value();
      // Assert.
      expect(actual).toEqual(value);
    });

    it('should update the value as the user types', async () => {
      // Arrange.
      // cspell: disable-next-line
      const expected = 'Purus gravida quis blandit turpis cursus in hac habitasse.';
      const target = await createTestTarget();
      // Act.
      await target.type(expected);
      const actual = await target.value();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should raise the onValueChange event when the user types a value', async () => {
      // Arrange.
      onValueChange = jest.fn();
      // cspell: disable-next-line
      const expected = 'Purus gravida quis blandit turpis cursus in hac habitasse.';
      const target = await createTestTarget();
      // Act.
      await target.type(expected);
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expected);
    });
  });
});
