/* eslint-disable require-jsdoc */
import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { ZCircusPerformer, ZCircusSetupRender, ZCircusWaitReact } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZBoolean, ZBooleanStyle } from './boolean';
import { ZBooleanComponentModel } from './boolean.cm';

describe('ZBoolean', () => {
  const waiter: IZCircusWait = new ZCircusWaitReact();
  const performer: IZCircusPerformer = new ZCircusPerformer();

  let disabled: boolean | undefined;
  let value: boolean | null | undefined;
  let onCheckChanged: jest.Mock | undefined;
  let type: ZBooleanStyle | undefined;

  async function createTestTarget() {
    const rendered = await new ZCircusSetupRender(<ZBoolean value={value} onValueChange={onCheckChanged} disabled={disabled} type={type} truthy='Yes' falsy='No' />).setup();
    await waiter.wait(() => rendered.container.querySelector('.ZBoolean-root') != null);
    const [target] = ZBooleanComponentModel.find(rendered.container);
    return new ZBooleanComponentModel(target, performer);
  }

  beforeEach(() => {
    value = undefined;
    disabled = undefined;
    onCheckChanged = undefined;
    type = undefined;
  });

  async function assertType(expected: ZBooleanStyle) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = target.type;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertValue(expected: boolean | null) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = target.value;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertDisabled(expected: boolean) {
    // Arrange.
    disabled = expected;
    const target = await createTestTarget();
    // Act.
    const actual = target.disabled;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertRaisesOnValueChange(expected: boolean, start: boolean | null) {
    // Arrange.
    value = start;
    onCheckChanged = jest.fn();
    const target = await createTestTarget();
    // Act.
    await target.toggle();
    // Assert.
    expect(onCheckChanged).toHaveBeenCalledWith(expected);
  }

  async function assertChangesState(expected: boolean, start: boolean) {
    // Arrange.
    value = undefined;
    const target = await createTestTarget();
    await target.toggle(start);
    // Act.
    await target.toggle();
    const actual = target.value;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertKeepsState(expected: boolean) {
    // Arrange.
    value = undefined;
    const target = await createTestTarget();
    await target.toggle(expected);
    // Act.
    await target.toggle(expected);
    const actual = target.value;
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe('Defaults', () => {
    it('should render the checkbox style', async () => {
      await assertType('checkbox');
    });

    it('should have a false value', async () => {
      await assertValue(false);
    });
  });

  describe('Checkbox', () => {
    beforeEach(() => {
      type = 'checkbox';
    });

    it('should render a checkbox.', async () => {
      await assertType('checkbox');
    });

    it('can be disabled.', async () => {
      await assertDisabled(true);
    });

    it('should render a checked checkbox for true.', async () => {
      value = true;
      await assertValue(true);
    });

    it('should render an unchecked checkbox for false.', async () => {
      value = false;
      await assertValue(false);
    });

    it('should render an indeterminate state for null.', async () => {
      value = null;
      await assertValue(null);
    });

    it('should raise onValueChange from true to false when clicked.', async () => {
      await assertRaisesOnValueChange(true, false);
    });

    it('should raise onValueChange from false to true when clicked.', async () => {
      await assertRaisesOnValueChange(false, true);
    });

    it('should raise onValueChange from indeterminate to true when clicked.', async () => {
      await assertRaisesOnValueChange(true, null);
    });

    it('should flip the state from true to false internally if no value is provided from the outside.', async () => {
      await assertChangesState(true, false);
    });

    it('should flip the state from false to true internally if no value is provided from the outside.', async () => {
      await assertChangesState(false, true);
    });
  });

  describe('Radio', () => {
    beforeEach(() => {
      type = 'radio';
    });

    it('should render a radio set', async () => {
      await assertType('radio');
    });

    it('can be disabled.', async () => {
      await assertDisabled(true);
    });

    it('should check the truthy radio for true.', async () => {
      value = true;
      await assertValue(true);
    });

    it('should check the falsy radio for false.', async () => {
      value = false;
      await assertValue(false);
    });

    it('should check nothing for an indeterminate state.', async () => {
      value = null;
      await assertValue(null);
    });

    it('should raise onValueChange from true to false when the truthy radio is clicked.', async () => {
      await assertRaisesOnValueChange(true, false);
    });

    it('should raise onValueChange from false to true when the falsy radio is clicked.', async () => {
      await assertRaisesOnValueChange(false, true);
    });

    it('should raise onValueChange from indeterminate to true when the truthy radio is clicked.', async () => {
      await assertRaisesOnValueChange(true, null);
    });

    it('should click the truthy radio internally if no value is provided from the outside.', async () => {
      await assertChangesState(true, false);
    });

    it('should click the falsy radio internally if no value is provided from the outside.', async () => {
      await assertChangesState(false, true);
    });

    it('should keep the same state if the truthy radio is checked but clicked again.', async () => {
      await assertKeepsState(true);
    });

    it('should keep the same state if the falsy radio is checked but clicked again.', async () => {
      await assertKeepsState(false);
    });
  });

  describe('Inline Radio', () => {
    beforeEach(() => {
      type = 'inline-radio';
    });

    it('should render a radio set', async () => {
      await assertType('inline-radio');
    });

    it('can be disabled.', async () => {
      await assertDisabled(true);
    });

    it('should check the truthy radio for true.', async () => {
      value = true;
      await assertValue(true);
    });

    it('should check the falsy radio for false.', async () => {
      value = false;
      await assertValue(false);
    });

    it('should check nothing for an indeterminate state.', async () => {
      value = null;
      await assertValue(null);
    });

    it('should raise onValueChange from true to false when the truthy radio is clicked.', async () => {
      await assertRaisesOnValueChange(true, false);
    });

    it('should raise onValueChange from false to true when the falsy radio is clicked.', async () => {
      await assertRaisesOnValueChange(false, true);
    });

    it('should raise onValueChange from indeterminate to true when the truthy radio is clicked.', async () => {
      await assertRaisesOnValueChange(true, null);
    });

    it('should click the truthy radio internally if no value is provided from the outside.', async () => {
      await assertChangesState(true, false);
    });

    it('should click the falsy radio internally if no value is provided from the outside.', async () => {
      await assertChangesState(false, true);
    });

    it('should keep the same state if the truthy radio is checked but clicked again.', async () => {
      await assertKeepsState(true);
    });

    it('should keep the same state if the falsy radio is checked but clicked again.', async () => {
      await assertKeepsState(false);
    });
  });

  describe('Switch', () => {
    beforeEach(() => {
      type = 'switch';
    });

    it('should render a switch set', async () => {
      await assertType('switch');
    });

    it('can be disabled.', async () => {
      await assertDisabled(true);
    });

    it('should toggle the switch on for true.', async () => {
      value = true;
      await assertValue(true);
    });

    it('should toggle the switch off for false.', async () => {
      value = false;
      await assertValue(false);
    });

    it('should toggle the switch off for indeterminate state.', async () => {
      value = null;
      await assertValue(false);
    });

    it('should raise onValueChange from true to false when the truthy radio is clicked.', async () => {
      await assertRaisesOnValueChange(true, false);
    });

    it('should raise onValueChange from false to true when the falsy radio is clicked.', async () => {
      await assertRaisesOnValueChange(false, true);
    });
  });
});
