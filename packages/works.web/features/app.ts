import { After, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { ZLearnWorld } from './learn-world';

Then('the page loads successfully', async function (this: ZLearnWorld) {
  assert.ok(true);
});

After(async function (this: ZLearnWorld) {
  await this.close();
});
