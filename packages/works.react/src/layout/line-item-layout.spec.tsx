/* eslint-disable require-jsdoc */
import { ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import React, { ReactNode } from 'react';
import { ZLineItemLayout } from './line-item-layout';
import { ZLineItemLayoutComponentModel } from './line-item-layout.cm';

describe('ZLineItemLayout', () => {
  const waiter = new ZCircusWait();
  let prefix: (() => ReactNode) | ReactNode | undefined;
  let body: (() => ReactNode) | ReactNode | undefined;
  let suffix: (() => ReactNode) | ReactNode | undefined;

  beforeEach(() => {
    prefix = undefined;
    body = undefined;
    suffix = undefined;
  });

  async function createTestTarget() {
    const element = <ZLineItemLayout prefix={prefix} body={body} suffix={suffix} />;

    const rendered = await new ZCircusSetupRender(element).setup();
    waiter.wait(() => !!ZLineItemLayoutComponentModel.find(rendered.container).length);
    const [target] = ZLineItemLayoutComponentModel.find(rendered.container);
    return new ZLineItemLayoutComponentModel(target);
  }

  describe('Prefix', () => {
    it('should render as a static node', async () => {
      // Arrange.
      const expected = 'Prefix';
      prefix = expected;
      const target = await createTestTarget();
      // Act.
      const actual = await target.prefix();
      // Assert.
      expect(actual.textContent).toEqual(expected);
    });

    it('should render as a function', async () => {
      // Arrange.
      const expected = 'Prefix';
      prefix = () => expected;
      const target = await createTestTarget();
      // Act.
      const actual = await target.prefix();
      // Assert.
      expect(actual.textContent).toEqual(expected);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.prefix();
      // Assert.
      expect(actual.textContent).toBeFalsy();
    });
  });

  describe('Body', () => {
    it('should render as a static node', async () => {
      // Arrange.
      const expected = 'Body';
      body = expected;
      const target = await createTestTarget();
      // Act.
      const actual = await target.body();
      // Assert.
      expect(actual.textContent).toEqual(expected);
    });

    it('should render as a function', async () => {
      // Arrange.
      const expected = 'Body';
      body = () => expected;
      const target = await createTestTarget();
      // Act.
      const actual = await target.body();
      // Assert.
      expect(actual.textContent).toEqual(expected);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.body();
      // Assert.
      expect(actual.textContent).toBeFalsy();
    });
  });

  describe('Suffix', () => {
    it('should render as a static node', async () => {
      // Arrange.
      const expected = 'Suffix';
      suffix = expected;
      const target = await createTestTarget();
      // Act.
      const actual = await target.suffix();
      // Assert.
      expect(actual.textContent).toEqual(expected);
    });

    it('should render as a function', async () => {
      // Arrange.
      const expected = 'Suffix';
      suffix = () => expected;
      const target = await createTestTarget();
      // Act.
      const actual = await target.suffix();
      // Assert.
      expect(actual.textContent).toEqual(expected);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.suffix();
      // Assert.
      expect(actual.textContent).toBeFalsy();
    });
  });
});
