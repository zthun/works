/* eslint-disable require-jsdoc */
import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZBooleanCheckbox } from './boolean-checkbox';
import { ZBooleanSwitch } from './boolean-switch';
import { ZBooleanComponentModel } from './boolean.cm';

describe('ZBoolean', () => {
  const waiter: IZCircusWait = new ZCircusWait();
  const performer: IZCircusPerformer = new ZCircusPerformer();

  let disabled: boolean | undefined;
  let onCheckChanged: jest.Mock | undefined;

  beforeEach(() => {
    disabled = undefined;
    onCheckChanged = undefined;
  });

  async function assertValue<T>(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: T) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = target.value;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertDisabled(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: boolean) {
    // Arrange.
    disabled = expected;
    const target = await createTestTarget();
    // Act.
    const actual = target.disabled;
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
    const actual = target.value;
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe('Checkbox', () => {
    async function createTestTarget(value?: boolean | null) {
      const rendered = await new ZCircusSetupRender(
        <ZBooleanCheckbox value={value} onValueChange={onCheckChanged} disabled={disabled} label='Checkbox' />
      ).setup();

      await waiter.wait(() => rendered.container.querySelector('.ZBoolean-root') != null);
      const [target] = ZBooleanComponentModel.find(rendered.container);
      return new ZBooleanComponentModel(target, performer);
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
      const rendered = await new ZCircusSetupRender(
        <ZBooleanSwitch value={value} onValueChange={onCheckChanged} disabled={disabled} label='Checkbox' />
      ).setup();

      await waiter.wait(() => rendered.container.querySelector('.ZBoolean-root') != null);
      const [target] = ZBooleanComponentModel.find(rendered.container);
      return new ZBooleanComponentModel(target, performer);
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
