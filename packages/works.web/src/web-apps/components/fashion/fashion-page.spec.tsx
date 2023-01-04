/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { stringify, ZFashionBuilder, ZHue, ZShade } from '@zthun/works.fashion';
import React from 'react';
import { ZFashionPage } from './fashion-page';
import { ZFashionPageComponentModel } from './fashion-page.cm';

describe('ZFashionPage', () => {
  async function createTestTarget() {
    const element = <ZFashionPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZFashionPageComponentModel);
  }

  it('should update the selected fashion.', async () => {
    // Arrange.
    const target = await createTestTarget();
    const grid = await target.grid();
    const hue = ZHue.Orange;
    const shade: ZShade = 500;
    const fashion = new ZFashionBuilder().hue(hue).shade(500).build();
    const expected = stringify(fashion);
    const block = await grid.get(ZHue.Orange, shade);
    // Act.
    await block?.click();
    const actual = await target.value();
    // Assert
    expect(actual).toEqual(expected);
  });
});
