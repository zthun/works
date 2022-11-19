import { After, Given } from '@cucumber/cucumber';
import { ZLearnWorld } from './learn-world';

Given<ZLearnWorld>('I open the learn application', async function (this: ZLearnWorld) {
  await this.open();
});

After(async function (this: ZLearnWorld) {
  await this.close();
});
