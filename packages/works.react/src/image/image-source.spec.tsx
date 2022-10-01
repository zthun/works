/* eslint-disable require-jsdoc */

import { render, waitFor } from '@testing-library/react';
import { ZDataUrlBuilder, ZMimeTypeImage, ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { ZImageSource } from './image-source';

describe('ZImageSource', () => {
  let src: string | undefined;

  async function createTestTarget() {
    const target = render(<ZImageSource src={src} />);
    await waitFor(() => expect(target.container.querySelector('.ZImageSource-root')).toBeTruthy());
    return target;
  }

  beforeEach(() => {
    src = undefined;
  });

  it('renders an empty div if the source is falsy.', async () => {
    // Arrange
    src = undefined;
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector('div.ZImageSource-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should render the app icon as a raw svg if it exists.', async () => {
    // Arrange
    src = new ZDataUrlBuilder()
      .encode('base64')
      .buffer(
        '<svg focusable="false" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>'
      )
      .mimeType(ZMimeTypeImage.SVG)
      .build();
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector('.ZImageSource-root svg');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should render the app icon as a raster image if the url is not a svg data url.', async () => {
    // Arrange
    src = new ZUrlBuilder().gravatar().build();
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector(`img.ZImageSource-root`);
    // Assert
    expect(actual).toBeTruthy();
  });
});
