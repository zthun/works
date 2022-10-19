/* eslint-disable require-jsdoc */
import { ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import { Property } from 'csstype';
import { values } from 'lodash';
import React from 'react';
import { ZColorless, ZColorTint, ZHueColor, ZSeverityColor, ZShadeColor, ZStateColor } from '../theme/state-color';
import { ZStateSize } from '../theme/state-size';
import { ZBorderLayout } from './border-layout';
import { ZBorderLayoutComponentModel } from './border-layout.cm';

describe('ZBorderLayout', () => {
  const waiter = new ZCircusWait();

  let border:
    | {
        size?: ZStateSize;
        style?: Property.BorderStyle;
        color?: ZStateColor;
        tint?: ZColorTint;
      }
    | undefined;

  let background:
    | {
        color?: ZStateColor;
        tint?: ZColorTint;
      }
    | undefined;

  async function createTestTarget() {
    const element = <ZBorderLayout border={border} background={background} />;
    const result = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => !!ZBorderLayoutComponentModel.find(result.container).length);
    const [target] = ZBorderLayoutComponentModel.find(result.container);
    return new ZBorderLayoutComponentModel(target);
  }

  beforeEach(() => {
    border = undefined;
    background = undefined;
  });

  it('should render a default background of transparent', async () => {
    // Arrange.
    const expected = `${ZColorless.Transparent}[${ZColorTint.Main}]`;
    const target = await createTestTarget();
    // Act.
    const actual = await target.backgroundColor();
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should render a default border of grey[400]', async () => {
    // Arrange.
    const expected = `${ZShadeColor.Grey}[${ZColorTint.T400}]`;
    const target = await createTestTarget();
    // Act.
    const actual = await target.borderColor();
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should render a default border style of solid', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.borderStyle();
    // Assert.
    expect(actual).toEqual('solid');
  });

  it('should render a default border size of extra small', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.borderSize();
    // Assert.
    expect(actual).toEqual(ZStateSize.ExtraSmall);
  });

  async function assertRendersBackground(color: ZStateColor, tint: ZColorTint) {
    // Arrange
    background = { color, tint };
    const expected = `${color}[${tint}]`;
    const target = await createTestTarget();
    // Act.
    const actual = await target.backgroundColor();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertRendersBorderColor(color: ZStateColor, tint: ZColorTint) {
    // Arrange
    border = { color, tint };
    const expected = `${color}[${tint}]`;
    const target = await createTestTarget();
    // Act.
    const actual = await target.borderColor();
    // Assert.
    expect(actual).toEqual(expected);
  }

  values(ZColorTint).forEach((tint) => {
    values(ZHueColor).forEach((hue) => {
      it(`should render a background of ${hue}[${tint}]`, async () => {
        await assertRendersBackground(hue, tint);
      });

      it(`should render a border color of ${hue}[${tint}]`, async () => {
        await assertRendersBorderColor(hue, tint);
      });
    });

    values(ZColorless).forEach((colorless) => {
      it(`should render a background of ${colorless}[${tint}]`, async () => {
        await assertRendersBackground(colorless, tint);
      });

      it(`should render a border color of ${colorless}[${tint}]`, async () => {
        await assertRendersBorderColor(colorless, tint);
      });
    });

    values(ZShadeColor).forEach((shade) => {
      it(`should render a background of ${shade}[${tint}]`, async () => {
        await assertRendersBackground(shade, tint);
      });

      it(`should render a border color of ${shade}[${tint}]`, async () => {
        await assertRendersBorderColor(shade, tint);
      });
    });

    values(ZSeverityColor).forEach((severity) => {
      it(`should render a background of ${severity}[${tint}]`, async () => {
        await assertRendersBackground(severity, tint);
      });

      it(`should render a border color of ${severity}[${tint}]`, async () => {
        await assertRendersBorderColor(severity, tint);
      });
    });
  });

  values(ZStateSize).forEach((size) => {
    it(`should render a border of size ${size}`, async () => {
      // Arrange.
      border = { size };
      const target = await createTestTarget();
      // Act.
      const actual = await target.borderSize();
      // Assert.
      expect(actual).toEqual(size);
    });
  });

  ['solid', 'dashed', 'dotted'].forEach((style) => {
    it(`should render a border with style ${style}`, async () => {
      // Arrange.
      border = { style };
      const target = await createTestTarget();
      // Act.
      const actual = await target.borderStyle();
      // Assert.
      expect(actual).toEqual(style);
    });
  });
});
