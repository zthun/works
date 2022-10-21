/* eslint-disable require-jsdoc */
import { IZCircusDriver } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React, { ReactNode } from 'react';
import { ZLineItemLayout } from './line-item-layout';
import { ZLineItemLayoutComponentModel } from './line-item-layout.cm';

describe('ZLineItemLayout', () => {
  let _driver: IZCircusDriver;

  let prefix: (() => ReactNode) | ReactNode | undefined;
  let body: (() => ReactNode) | ReactNode | undefined;
  let suffix: (() => ReactNode) | ReactNode | undefined;

  beforeEach(() => {
    prefix = undefined;
    body = undefined;
    suffix = undefined;
  });

  afterEach(async () => {
    await _driver.destroy();
  });

  async function createTestTarget() {
    const element = <ZLineItemLayout prefix={prefix} body={body} suffix={suffix} />;

    _driver = await new ZCircusSetupRenderer(element).setup();
    _driver.wait(() => _driver.peek(ZLineItemLayoutComponentModel.Selector));
    const target = await _driver.select(ZLineItemLayoutComponentModel.Selector);
    return new ZLineItemLayoutComponentModel(target);
  }

  describe('Prefix', () => {
    it('should render as a static node', async () => {
      // Arrange.
      const expected = 'Prefix';
      prefix = expected;
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.prefix()).text();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should render as a function', async () => {
      // Arrange.
      const expected = 'Prefix';
      prefix = () => expected;
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.prefix()).text();
      // Assert.
      expect(actual).toEqual(expected);
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
      const expected = 'Body';
      body = expected;
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.body()).text();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should render as a function', async () => {
      // Arrange.
      const expected = 'Body';
      body = () => expected;
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.body()).text();
      // Assert.
      expect(actual).toEqual(expected);
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
      const expected = 'Suffix';
      suffix = expected;
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.suffix()).text();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should render as a function', async () => {
      // Arrange.
      const expected = 'Suffix';
      suffix = () => expected;
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.suffix()).text();
      // Assert.
      expect(actual).toEqual(expected);
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
