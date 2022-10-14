/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { ZCircusSetupRender } from '@zthun/works.cirque-du-react';
import React from 'react';
import {
  IZTypographyProps,
  ZCaption,
  ZH1,
  ZH2,
  ZH3,
  ZH4,
  ZH5,
  ZH6,
  ZOverline,
  ZParagraph,
  ZSubtitle
} from './typography';

describe('Typography', () => {
  async function createTestTarget(Typography: (props: IZTypographyProps) => JSX.Element) {
    const element = <Typography></Typography>;
    const result = await new ZCircusSetupRender(element).setup();
    const target = result.container.firstElementChild;
    return target!;
  }

  async function assertTypography(expected: string, Typography: (props: IZTypographyProps) => JSX.Element) {
    // Arrange
    const target = await createTestTarget(Typography);
    // Act
    const actual = target.nodeName.toLowerCase();
    // Assert
    expect(actual).toEqual(expected);
  }

  describe('Headers', () => {
    it('should render an h1 tag', async () => {
      await assertTypography('h1', ZH1);
    });

    it('should render an h2 tag', async () => {
      await assertTypography('h2', ZH2);
    });

    it('should render an h3 tag', async () => {
      await assertTypography('h3', ZH3);
    });

    it('should render an h4 tag', async () => {
      await assertTypography('h4', ZH4);
    });

    it('should render an h5 tag', async () => {
      await assertTypography('h5', ZH5);
    });

    it('should render an h5 tag', async () => {
      await assertTypography('h6', ZH6);
    });
  });

  describe('Text', () => {
    it('should render a paragraph', async () => {
      await assertTypography('p', ZParagraph);
    });

    it('should render a subtitle', async () => {
      await assertTypography('p', ZSubtitle);
    });

    it('should render a caption', async () => {
      await assertTypography('p', ZCaption);
    });

    it('should render an overline', async () => {
      await assertTypography('p', ZOverline);
    });
  });
});
