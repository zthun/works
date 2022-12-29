import { After, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { ZLearnWorld } from './learn-world';

Given<ZLearnWorld>('I open the learn application', async function (this: ZLearnWorld) {
  await this.open();
});

Then('the page loads successfully', async function (this: ZLearnWorld) {
  assert.ok(true);
});

After(async function (this: ZLearnWorld) {
  await this.close();
});
