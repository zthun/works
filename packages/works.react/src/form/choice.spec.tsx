/* eslint-disable require-jsdoc */
import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import { identity, noop, range } from 'lodash';
import React from 'react';
import { ReactNode } from 'react-markdown';
import { ZChoice, ZChoiceType } from './choice';
import { ZChoiceComponentModel } from './choice.cm';

describe('Choice', () => {
  const performer: IZCircusPerformer = new ZCircusPerformer();
  const waiter: IZCircusWait = new ZCircusWait();

  let options: any[];
  let type: ZChoiceType | undefined;
  let selected: any[] | undefined;
  let multiple: boolean | undefined;
  let indelible: boolean | undefined;
  let identifier: undefined | ((op: any) => string | number);
  let onValueChange: jest.Mock | undefined;
  let renderOption: undefined | ((op: any) => ReactNode);
  let renderValue: undefined | ((op: any) => ReactNode);

  async function createTestTarget() {
    const element = (
      <ZChoice
        options={options}
        headerText='Choice Test'
        type={type}
        indelible={indelible}
        multiple={multiple}
        value={selected}
        onValueChange={onValueChange}
        identifier={identifier}
        renderOption={renderOption}
        renderValue={renderValue}
      />
    );

    const rendered = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => ZChoiceComponentModel.find(rendered.container).length > 0);
    const [target] = ZChoiceComponentModel.find(rendered.container);
    return new ZChoiceComponentModel(target, performer, waiter);
  }

  beforeEach(() => {
    selected = undefined;
    type = undefined;
    indelible = undefined;
    multiple = undefined;
    identifier = undefined;
    onValueChange = undefined;
    renderOption = undefined;
    renderValue = undefined;

    options = ['One', 'Two', 'Three', 'Four', 'Five'];
  });

  async function shouldRenderChoice(expected: ZChoiceType) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = target.type;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldRenderOptionsWhenOpened() {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const _options = await target.open();
    const actual = _options.map((op) => op.text);
    // Assert.
    expect(actual).toEqual(options);
  }

  async function shouldSelectByIdentifier() {
    // Arrange.
    options = range(1, 5).map((id) => ({ id, name: `${id}` }));
    identifier = (op) => op.id;
    renderValue = (op) => op.name;
    renderOption = (op) => op.name;
    const [, expected] = options;
    selected = [expected.id];
    const target = await createTestTarget();
    // Act.
    const [_selected] = target.selected;
    const actual = _selected.text;
    // Assert.
    expect(actual).toEqual(expected.name);
  }

  async function shouldSelectByObject() {
    // Arrange.
    const [, , expected] = options;
    selected = [expected];
    const target = await createTestTarget();
    // Act.
    const [_selected] = target.selected;
    const actual = _selected.text;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldNotBeAbleToClearIfTheChoiceIsIndelible() {
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

  async function shouldClearTheSelection() {
    // Arrange.
    selected = options;
    onValueChange = jest.fn();
    const target = await createTestTarget();
    // Act.
    await target.clear();
    // Assert.
    expect(onValueChange).toHaveBeenCalledWith([]);
  }

  async function shouldChangeSelectionToASingleItemIfMultipleIsOff() {
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
    const actual = target.selected.map((ch) => ch.text);
    // Assert
    expect(actual).toEqual(expected);
  }

  async function shouldAppendSelectionsIfMultipleIsTurnedOn() {
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
    const actual = target.selected.map((ch) => ch.text);
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldNotSelectAnythingIfSelectedOptionIsNotAvailable() {
    // Arrange.
    selected = undefined;
    onValueChange = undefined;
    const target = await createTestTarget();
    // Act.
    await target.select('not-an-option');
    const actual = target.selected;
    // Assert.
    expect(actual).toEqual([]);
  }

  describe('Default', () => {
    it('should render a drop down choice', async () => {
      await shouldRenderChoice(ZChoiceType.DropDown);
    });
  });

  describe('Drop Down', () => {
    beforeEach(() => {
      type = ZChoiceType.DropDown;
    });

    it('should render a drop down choice', async () => {
      await shouldRenderChoice(ZChoiceType.DropDown);
    });

    it('should render all options when opened', async () => {
      await shouldRenderOptionsWhenOpened();
    });

    it('should select by an identifier', async () => {
      await shouldSelectByIdentifier();
    });

    it('should select by the entire object', async () => {
      await shouldSelectByObject();
    });

    it('should select the raw value if there is no option for the value', async () => {
      // Arrange.
      const expected = 'not-a-value';
      const warn = jest.spyOn(console, 'warn');
      warn.mockImplementation(noop);
      selected = [expected];
      const target = await createTestTarget();
      // Act.
      const [_selected] = target.selected;
      const actual = _selected.text;
      warn.mockRestore();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should not be able to clear if the choice is indelible', async () => {
      await shouldNotBeAbleToClearIfTheChoiceIsIndelible();
    });

    it('should clear the selection', async () => {
      await shouldClearTheSelection();
    });

    it('should change the selection to a single item if multiple is off', async () => {
      await shouldChangeSelectionToASingleItemIfMultipleIsOff();
    });

    it('should append selections if multiple is turned on', async () => {
      await shouldAppendSelectionsIfMultipleIsTurnedOn();
    });

    it('should not select anything if the selected option is not available', async () => {
      await shouldNotSelectAnythingIfSelectedOptionIsNotAvailable();
    });
  });
});
