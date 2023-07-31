/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZDataUrlBuilder, ZMimeTypeImage, ZUrlBuilder } from '@zthun/webigail-url';
import React from 'react';
import { ZImageSource } from './image-source';
import { ZImageSourceComponentModel } from './image-source.cm';

describe('ZImageSource', () => {
  let src: string | undefined;
  let name: string | undefined;
  let svg: string;

  async function createTestTarget() {
    const element = <ZImageSource src={src} name={name} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZImageSourceComponentModel);
  }

  beforeEach(() => {
    src = undefined;
    name = undefined;

    svg =
      '<svg focusable="false" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>';
  });

  async function shouldRenderNameAttribute() {
    // Arrange
    name = 'test-image';
    const target = await createTestTarget();
    // Act.
    const actual = await target.name();
    // Assert.
    expect(actual).toEqual(name);
  }

  describe('Empty', () => {
    beforeEach(() => {
      src = undefined;
    });

    it('renders an empty div.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.empty();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('renders the name property', async () => {
      await shouldRenderNameAttribute();
    });
  });

  describe('SVG', () => {
    beforeEach(() => {
      src = new ZDataUrlBuilder().encode('base64').buffer(svg).mimeType(ZMimeTypeImage.SVG).build();
    });

    it('should render the app icon as a raw svg if it exists.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.svg();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('renders the name property', async () => {
      await shouldRenderNameAttribute();
    });
  });

  describe('IMG', () => {
    beforeEach(() => {
      src = new ZUrlBuilder().gravatar().build();
    });

    it('should render the app icon as a raster image if the url is not a svg data url.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.img();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('renders the name property', async () => {
      await shouldRenderNameAttribute();
    });
  });
});
