/* eslint-disable require-jsdoc */
import { ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React, { ReactNode } from 'react';
import { ZLineItemLayout } from './line-item-layout';
import { ZLineItemLayoutComponentModel } from './line-item-layout.cm';

describe('ZLineItemLayout', () => {
  let prefix: ReactNode | undefined;
  let body: ReactNode | undefined;
  let suffix: ReactNode | undefined;

  beforeEach(() => {
    prefix = undefined;
    body = undefined;
    suffix = undefined;
  });

  async function createTestTarget() {
    const element = <ZLineItemLayout prefix={prefix} body={body} suffix={suffix} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZLineItemLayoutComponentModel);
  }

  describe('Prefix', () => {
    it('should render as a static node', async () => {
      // Arrange.
      prefix = 'Prefix';
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.prefix()).text();
      // Assert.
      expect(actual).toEqual(prefix);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.prefix()).text();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Body', () => {
    it('should render as a static node', async () => {
      // Arrange.
      body = 'Body';
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.body()).text();
      // Assert.
      expect(actual).toEqual(body);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.body()).text();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Suffix', () => {
    it('should render as a static node', async () => {
      // Arrange.
      suffix = 'Suffix';
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.suffix()).text();
      // Assert.
      expect(actual).toEqual(suffix);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.suffix()).text();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });
});
