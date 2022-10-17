/* eslint-disable require-jsdoc */
import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import { identity, noop, range } from 'lodash';
import React, { ReactNode } from 'react';
import { ZChoiceAutocomplete } from './choice-autocomplete';
import { ZChoiceDropDown } from './choice-drop-down';
import { ZChoiceComponentModel } from './choice.cm';

describe('ZChoice', () => {
  const performer: IZCircusPerformer = new ZCircusPerformer();
  const waiter: IZCircusWait = new ZCircusWait();

  let options: any[];
  let identifier: (op: any) => any;

  let selected: any[] | undefined;
  let multiple: boolean | undefined;
  let indelible: boolean | undefined;
  let onValueChange: jest.Mock | undefined;
  let display: undefined | ((op: any) => string);
  let renderOption: undefined | ((op: any) => ReactNode);

  beforeEach(() => {
    selected = undefined;
    display = undefined;
    indelible = undefined;
    multiple = undefined;
    onValueChange = undefined;
    renderOption = undefined;

    identifier = identity;
    options = ['One', 'Two', 'Three', 'Four', 'Five'];
  });

  async function shouldRenderAllOptionsWhenOpened(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const _options = await target.open();
    const actual = _options.map((op) => op.text);
    // Assert.
    expect(actual).toEqual(options);
  }

  async function shouldRenderCustomOptionDisplay(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    const expected = 'EXPECTED: ';
    renderOption = (op) => `${expected}${op}`;
    const target = await createTestTarget();
    // Act.
    const _options = await target.open();
    const actual = _options.map((op) => op.text).every((v) => v.startsWith(expected));
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldSelectByIdentifier(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    options = range(1, 5).map((id) => ({ id, name: `${id}` }));
    identifier = (op) => op.id;
    display = (op) => op.name;
    const [, expected] = options;
    selected = [expected.id];
    const target = await createTestTarget();
    // Act.
    const [_selected] = await target.selected();
    const actual = _selected.text;
    // Assert.
    expect(actual).toEqual(expected.name);
  }

  async function shouldSelectByTheEntireObject(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    const [, , expected] = options;
    selected = [expected];
    const target = await createTestTarget();
    // Act.
    const [_selected] = await target.selected();
    const actual = _selected.text;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldNotBeAbleToClearIfTheChoiceIsIndelible(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    indelible = true;
    multiple = true;
    selected = options;
    onValueChange = jest.fn();
    const target = await createTestTarget();
    // Act.
    await target.clear();
    // Assert.
    expect(onValueChange).not.toHaveBeenCalled();
  }

  async function shouldClearTheSelection(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    selected = options;
    onValueChange = jest.fn();
    const target = await createTestTarget();
    // Act.
    await target.clear();
    // Assert.
    expect(onValueChange).toHaveBeenCalledWith([]);
  }

  async function shouldChangeSelectionToSingleIfMultipleOff(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    selected = undefined;
    onValueChange = undefined;
    multiple = false;
    identifier = identity;
    const target = await createTestTarget();
    const expected = [options[1]];
    // Act.
    await target.select(options[0]);
    await target.select(options[1]);
    const selection = await target.selected();
    const actual = selection.map((ch) => ch.text);
    // Assert
    expect(actual).toEqual(expected);
  }

  async function shouldAppendSelectionIfMultipleOn(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    selected = undefined;
    onValueChange = undefined;
    multiple = true;
    const target = await createTestTarget();
    const expected = options.slice(0, 2);
    // Act.
    const menu = await target.open();
    await target.select(menu[0]);
    await target.select(menu[1]);
    const selection = await target.selected();
    const actual = selection.map((ch) => ch.text);
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldSelectNothingIfOptionIsUnavailable(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    selected = undefined;
    onValueChange = undefined;
    const target = await createTestTarget();
    // Act.
    await target.select('not-an-option');
    const actual = await target.selected();
    // Assert.
    expect(actual).toEqual([]);
  }

  describe('DropDown', () => {
    async function createTestTarget() {
      const element = (
        <ZChoiceDropDown
          options={options}
          label='Choice Test'
          indelible={indelible}
          multiple={multiple}
          value={selected}
          onValueChange={onValueChange}
          identifier={identifier}
          display={display}
          renderOption={renderOption}
        />
      );

      const rendered = await new ZCircusSetupRender(element).setup();
      await waiter.wait(() => ZChoiceComponentModel.find(rendered.container).length > 0);
      const [target] = ZChoiceComponentModel.find(rendered.container);
      return new ZChoiceComponentModel(target, performer, waiter);
    }

    it('should render all options when opened', async () => {
      await shouldRenderAllOptionsWhenOpened(createTestTarget);
    });

    it('should render a customer display for an option', async () => {
      await shouldRenderCustomOptionDisplay(createTestTarget);
    });

    it('should select by an identifier', async () => {
      await shouldSelectByIdentifier(createTestTarget);
    });

    it('should select by the entire object', async () => {
      await shouldSelectByTheEntireObject(createTestTarget);
    });

    it('should not be able to clear if the choice is indelible', async () => {
      await shouldNotBeAbleToClearIfTheChoiceIsIndelible(createTestTarget);
    });

    it('should clear the selection', async () => {
      await shouldClearTheSelection(createTestTarget);
    });

    it('should change the selection to a single item if multiple is off', async () => {
      await shouldChangeSelectionToSingleIfMultipleOff(createTestTarget);
    });

    it('should append selections if multiple is turned on', async () => {
      await shouldAppendSelectionIfMultipleOn(createTestTarget);
    });

    it('should not select anything if the selected option is not available', async () => {
      await shouldSelectNothingIfOptionIsUnavailable(createTestTarget);
    });

    it('should select the raw value if there is no option for the value', async () => {
      // Arrange.
      const expected = 'not-a-value';
      const warn = jest.spyOn(console, 'warn');
      warn.mockImplementation(noop);
      selected = [expected];
      const target = await createTestTarget();
      // Act.
      const [_selected] = await target.selected();
      const actual = _selected.text;
      warn.mockRestore();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Autocomplete', () => {
    async function createTestTarget() {
      const element = (
        <ZChoiceAutocomplete
          options={options}
          label='Choice Test'
          indelible={indelible}
          multiple={multiple}
          value={selected}
          onValueChange={onValueChange}
          identifier={identifier}
          display={display}
          renderOption={renderOption}
        />
      );

      const rendered = await new ZCircusSetupRender(element).setup();
      await waiter.wait(() => ZChoiceComponentModel.find(rendered.container).length > 0);
      const [target] = ZChoiceComponentModel.find(rendered.container);
      return new ZChoiceComponentModel(target, performer, waiter);
    }

    it('should render all options when opened', async () => {
      await shouldRenderAllOptionsWhenOpened(createTestTarget);
    });

    it('should select by an identifier', async () => {
      await shouldSelectByIdentifier(createTestTarget);
    });

    it('should select by the entire object', async () => {
      await shouldSelectByTheEntireObject(createTestTarget);
    });

    it('should not be able to clear if the choice is indelible', async () => {
      await shouldNotBeAbleToClearIfTheChoiceIsIndelible(createTestTarget);
    });

    it('should clear the selection', async () => {
      await shouldClearTheSelection(createTestTarget);
    });

    it('should change the selection to a single item if multiple is off', async () => {
      await shouldChangeSelectionToSingleIfMultipleOff(createTestTarget);
    });

    it('should append selections if multiple is turned on', async () => {
      await shouldAppendSelectionIfMultipleOn(createTestTarget);
    });

    it('should not select anything if the selected option is not available', async () => {
      await shouldSelectNothingIfOptionIsUnavailable(createTestTarget);
    });
  });
});
