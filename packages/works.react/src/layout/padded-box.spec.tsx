/* eslint-disable require-jsdoc */

import { ZCircusSetupRender } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZStateSize } from '../theme/state-size';
import { ZPaddedBox } from './padded-box';

describe('ZPaddedBox', () => {
  async function createTestTarget() {
    const element = <ZPaddedBox padding={ZStateSize.Large} />;
    return await new ZCircusSetupRender(element).setup();
  }

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
