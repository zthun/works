/* eslint-disable require-jsdoc */

import { IZCircusDriver } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZStateSize } from '../theme/state-size';
import { ZPaddedBox } from './padded-box';

describe('ZPaddedBox', () => {
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZPaddedBox padding={ZStateSize.Large} />;
    _driver = await new ZCircusSetupRenderer(element).setup();
    return _driver;
  }

  afterEach(async () => {
    await _driver.destroy();
  });

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
