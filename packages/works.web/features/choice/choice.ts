import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZChoicePageComponentModel } from '../../src/web-apps/components/choice/choice-page.cm';
import { ZLearnWorld } from '../learn-world';

interface IZChoicePage {
  page: ZChoicePageComponentModel;
}

type ChoiceDemo = 'dropdown' | 'autocomplete';
type OptionCheckbox = 'multiple' | 'disabled' | 'indelible';

When('I navigate to the choice demo page', async function (this: ZLearnWorld<IZChoicePage>) {
  await this.navigate('/web-apps/components/choice');
  this.parameters.page = await this.create(ZChoicePageComponentModel, ZChoicePageComponentModel.Selector);
});

When(
  'I clear the existing selection on the {string} on the choice demo page',
  async function (this: ZLearnWorld<IZChoicePage>, name: 'dropdown' | 'autocomplete') {
    const choice = await this.parameters.page[name]();
    await choice.clear();
  }
);

When(
  'I select {string} on the {string} on the choice demo page',
  async function (this: ZLearnWorld<IZChoicePage>, text: string, name: ChoiceDemo) {
    const choice = await this.parameters.page[name]();
    await choice.select(text);
  }
);

When(
  'I check the {string} option on the choice demo page',
  async function (this: ZLearnWorld<IZChoicePage>, name: OptionCheckbox) {
    const option = await this.parameters.page[name]();
    await option.toggle(true);
  }
);

Then(
  'the values should be updated to {string} on the choice demo page',
  async function (this: ZLearnWorld<IZChoicePage>, values: string) {
    const list = await this.parameters.page.value();
    const actual = list.join(',');
    assert.equal(actual, values);
  }
);

Then(
  'the {string} should be disabled on the choice demo page',
  async function (this: ZLearnWorld<IZChoicePage>, name: ChoiceDemo) {
    const choice = await this.parameters.page[name]();
    const actual = await choice.disabled();
    assert.ok(actual);
  }
);

Then('the {string} should be indelible', async function (this: ZLearnWorld<IZChoicePage>, name: ChoiceDemo) {
  const choice = await this.parameters.page[name]();
  await choice.clear();
  const actual = await this.parameters.page.value();
  assert.ok(actual.length > 0);
});
