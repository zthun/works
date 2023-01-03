/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZLink } from './link';
import { ZLinkComponentModel } from './link.cm';

describe('ZLink', () => {
  let label: string | undefined;
  let href: string | undefined;
  let name: string | undefined;
  let onClick: jest.Mock | undefined;

  async function createTestTarget() {
    const element = <ZLink href={href} name={name} label={label} onClick={onClick} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZLinkComponentModel);
  }

  beforeEach(() => {
    href = undefined;
    name = undefined;
    label = undefined;
    onClick = undefined;
  });

  it('should set the name.', async () => {
    // Arrange.
    name = 'test-link-name';
    const target = await createTestTarget();
    // Act.
    const actual = await target.name();
    // Assert.
    expect(actual).toEqual(name);
  });

  it('should set the hypertext reference.', async () => {
    // Arrange.
    href = '#/path/to/resource';
    const target = await createTestTarget();
    // Act.
    const actual = await target.reference();
    // Assert.
    expect(actual).toEqual(href);
  });

  it('should retrieve the underlying label', async () => {
    // Arrange.
    label = 'Label';
    const target = await createTestTarget();
    // Act.
    const actual = await target.label();
    // Assert.
    expect(actual).toEqual(label);
  });

  it('should route to the given reference when clicked', async () => {
    // Arrange.
    href = '#/path/to/resource';
    onClick = jest.fn();
    const target = await createTestTarget();
    // Act.
    await target.click();
    // Assert.
    expect(onClick).toHaveBeenCalledWith(href);
  });
});
