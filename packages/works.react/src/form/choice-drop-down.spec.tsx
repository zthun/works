/* eslint-disable require-jsdoc */
import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import { identity, noop, range } from 'lodash';
import React from 'react';
import { ReactNode } from 'react-markdown';
import { ZChoiceDropDown } from './choice-drop-down';
import { ZChoiceDropDownComponentModel } from './choice-drop-down.cm';

describe('ZChoiceDropDown', () => {
  const performer: IZCircusPerformer = new ZCircusPerformer();
  const waiter: IZCircusWait = new ZCircusWait();

  let options: any[];
  let identifier: (op: any) => any;

  let selected: any[] | undefined;
  let multiple: boolean | undefined;
  let indelible: boolean | undefined;
  let onValueChange: jest.Mock | undefined;
  let renderOption: undefined | ((op: any) => ReactNode);

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
        renderOption={renderOption}
      />
    );

    const rendered = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => ZChoiceDropDownComponentModel.find(rendered.container).length > 0);
    const [target] = ZChoiceDropDownComponentModel.find(rendered.container);
    return new ZChoiceDropDownComponentModel(target, performer, waiter);
  }

  beforeEach(() => {
    selected = undefined;
    indelible = undefined;
    multiple = undefined;
    onValueChange = undefined;
    renderOption = undefined;

    identifier = identity;
    options = ['One', 'Two', 'Three', 'Four', 'Five'];
  });

  it('should render all options when opened', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const _options = await target.open();
    const actual = _options.map((op) => op.text);
    // Assert.
    expect(actual).toEqual(options);
  });

  it('should select by an identifier', async () => {
    // Arrange.
    options = range(1, 5).map((id) => ({ id, name: `${id}` }));
    identifier = (op) => op.id;
    renderOption = (op) => op.name;
    const [, expected] = options;
    selected = [expected.id];
    const target = await createTestTarget();
    // Act.
    const [_selected] = target.selected;
    const actual = _selected.text;
    // Assert.
    expect(actual).toEqual(expected.name);
  });

  it('should select by the entire object', async () => {
    // Arrange.
    const [, , expected] = options;
    selected = [expected];
    const target = await createTestTarget();
    // Act.
    const [_selected] = target.selected;
    const actual = _selected.text;
    // Assert.
    expect(actual).toEqual(expected);
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
  });

  it('should clear the selection', async () => {
    // Arrange.
    selected = options;
    onValueChange = jest.fn();
    const target = await createTestTarget();
    // Act.
    await target.clear();
    // Assert.
    expect(onValueChange).toHaveBeenCalledWith([]);
  });

  it('should change the selection to a single item if multiple is off', async () => {
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
  });

  it('should append selections if multiple is turned on', async () => {
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
  });

  it('should not select anything if the selected option is not available', async () => {
    // Arrange.
    selected = undefined;
    onValueChange = undefined;
    const target = await createTestTarget();
    // Act.
    await target.select('not-an-option');
    const actual = target.selected;
    // Assert.
    expect(actual).toEqual([]);
  });
});
