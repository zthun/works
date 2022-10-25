/* eslint-disable require-jsdoc */
import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React, { ReactElement } from 'react';
import { ZBooleanCheckbox } from './boolean-checkbox';
import { ZBooleanSwitch } from './boolean-switch';
import { ZBooleanComponentModel } from './boolean.cm';

describe('ZBoolean', () => {
  let disabled: boolean | undefined;
  let onCheckChanged: jest.Mock | undefined;

  async function createComponentModel(element: ReactElement) {
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZBooleanComponentModel, ZBooleanComponentModel.Selector);
  }

  beforeEach(() => {
    disabled = undefined;
    onCheckChanged = undefined;
  });

  async function assertValue<T>(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: T) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertDisabled(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: boolean) {
    // Arrange.
    disabled = expected;
    const target = await createTestTarget();
    // Act.
    const actual = await target.disabled();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertRaisesOnValueChange(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: boolean) {
    // Arrange.
    onCheckChanged = jest.fn();
    const target = await createTestTarget();
    // Act.
    await target.toggle();
    // Assert.
    expect(onCheckChanged).toHaveBeenCalledWith(expected);
  }

  async function assertChangesState(
    createTestTarget: () => Promise<ZBooleanComponentModel>,
    expected: boolean,
    start: boolean
  ) {
    // Arrange.
    const target = await createTestTarget();
    await target.toggle(start);
    // Act.
    await target.toggle();
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe('Checkbox', () => {
    async function createTestTarget(value?: boolean | null) {
      const element = (
        <ZBooleanCheckbox value={value} onValueChange={onCheckChanged} disabled={disabled} label='Checkbox' />
      );

      return createComponentModel(element);
    }

    it('can be disabled.', async () => {
      await assertDisabled(createTestTarget, true);
    });

    it('should render a checked checkbox for true.', async () => {
      await assertValue(createTestTarget.bind(null, true), true);
    });

    it('should render an unchecked checkbox for false.', async () => {
      await assertValue(createTestTarget.bind(null, false), false);
    });

    it('should render an indeterminate state for null.', async () => {
      await assertValue(createTestTarget.bind(null, null), null);
    });

    it('should raise onValueChange from true to false when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, true), false);
    });

    it('should raise onValueChange from false to true when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, false), true);
    });

    it('should raise onValueChange from indeterminate to true when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, null), true);
    });

    it('should flip the state from true to false internally if no value is provided from the outside.', async () => {
      await assertChangesState(createTestTarget, true, false);
    });

    it('should flip the state from false to true internally if no value is provided from the outside.', async () => {
      await assertChangesState(createTestTarget, false, true);
    });
  });

  describe('Switch', () => {
    async function createTestTarget(value?: boolean) {
      const element = (
        <ZBooleanSwitch value={value} onValueChange={onCheckChanged} disabled={disabled} label='Switch' />
      );

      return createComponentModel(element);
    }

    it('can be disabled.', async () => {
      await assertDisabled(createTestTarget, true);
    });

    it('should toggle the switch on for true.', async () => {
      await assertValue(createTestTarget.bind(null, true), true);
    });

    it('should toggle the switch off for false.', async () => {
      await assertValue(createTestTarget.bind(null, false), false);
    });

    it('should raise onValueChange from true to false when the truthy radio is clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, true), false);
    });

    it('should raise onValueChange from false to true when the falsy radio is clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, false), true);
    });

    it('should flip the state from true to false internally if no value is provided from the outside.', async () => {
      await assertChangesState(createTestTarget, true, false);
    });

    it('should flip the state from false to true internally if no value is provided from the outside.', async () => {
      await assertChangesState(createTestTarget, false, true);
    });
  });
});
