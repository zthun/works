/* eslint-disable require-jsdoc */

import { ZCircusSetupChrome } from '@zthun/works.cirque-du-selenium';

describe('Home Page', () => {
  async function createTestTarget() {
    const driver = await new ZCircusSetupChrome('https://google.com').setup();

    return driver;
  }

  it('should load the page', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    expect(target).toBeTruthy();
  });
});
