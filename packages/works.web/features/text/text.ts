import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZTextPageComponentModel } from '../../src/web-apps/components/text/text-page.cm';
import { ZLearnWorld } from '../learn-world';

interface IZTextPage {
  page: ZTextPageComponentModel;
}

type FieldName = 'text' | 'password' | 'reveal' | 'area';
type OptionName = 'disabled' | 'readOnly' | 'required' | 'adornments';

// cspell:disable
const LOREM1 = 'Lorem ipsum dolor sit amet.';
const LOREM2 = 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt.';
const LOREM3 = 'Ut labore et dolore magna aliqua. Massa sed elementum tempus egestas sed.';
// cspell:enable

Given('I navigate to the text demo page', async function (this: ZLearnWorld<IZTextPage>) {
  await this.navigate('/web-apps/components/text');
  this.parameters.page = await this.create(ZTextPageComponentModel, ZTextPageComponentModel.Selector);
});

When('I enter multiple lines into the text area on the text demo page', async function (this: ZLearnWorld<IZTextPage>) {
  const area = await this.parameters.page.area();
  await area.essay([LOREM1, LOREM2, LOREM3]);
});

When(
  'I enter the text {string} into the {string} field on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>, text: string, name: FieldName) {
    const field = await this.parameters.page[name]();
    await field.keyboard(text);
  }
);

When(
  'I check the {string} option on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>, name: OptionName) {
    const option = await this.parameters.page[name]();
    await option.toggle(true);
  }
);

When(
  'I click the reveal button on the reveal field on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>) {
    const reveal = await this.parameters.page.reveal();
    await reveal.keyboard('Secret Text');
    await reveal.reveal();
  }
);

Then(
  'the value of the {string} field should be {string} on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>, name: FieldName, expected: string) {
    const field = await this.parameters.page[name]();
    const actual = await field.value();
    assert.equal(actual, expected);
  }
);

Then(
  'the {string} field is disabled on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>, name: FieldName) {
    const field = await this.parameters.page[name]();
    const actual = await field.disabled();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} field is read only on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>, name: FieldName) {
    const field = await this.parameters.page[name]();
    const actual = await field.readOnly();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} field is required on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>, name: FieldName) {
    const field = await this.parameters.page[name]();
    const actual = await field.required();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} field has adornments on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>, name: FieldName) {
    const field = await this.parameters.page[name]();
    const prefix = await field.prefix();
    const suffix = await field.suffix();
    const actual = prefix != null && suffix != null;
    assert.equal(actual, true);
  }
);

Then(
  'the value of area should be separated by two new lines on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>) {
    const sep = '\\n\\n';
    const expected = [LOREM1, LOREM2, LOREM3].join(sep).concat(sep);
    const value = await this.parameters.page.value();
    assert.equal(value, expected);
  }
);

Then(
  'I should be able to see the text on the reveal field on the text demo page',
  async function (this: ZLearnWorld<IZTextPage>) {
    const reveal = await this.parameters.page.reveal();
    const actual = await reveal.masked();
    assert.equal(actual, false);
  }
);
