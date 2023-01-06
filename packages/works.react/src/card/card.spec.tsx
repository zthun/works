/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React, { ReactNode } from 'react';
import { ZCard } from './card';
import { ZCardComponentModel } from './card.cm';

describe('ZCard', () => {
  let footer: ReactNode | undefined;
  let heading: ReactNode | undefined;
  let content: ReactNode | undefined;
  let subHeading: ReactNode | undefined;

  async function createTestTarget() {
    const element = (
      <ZCard heading={heading} subHeading={subHeading} footer={footer}>
        {content}
      </ZCard>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZCardComponentModel);
  }

  beforeEach(() => {
    footer = undefined;
    heading = undefined;
    subHeading = undefined;
    content = undefined;
  });

  describe('Header', () => {
    it('should render the heading', async () => {
      // Arrange.
      heading = 'Test Heading';
      const target = await createTestTarget();
      // Act.
      const actual = await target.heading();
      // Assert
      expect(actual).toEqual(heading);
    });

    it('should return null if no heading is supplied', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.heading();
      // Assert
      expect(actual).toEqual('');
    });

    it('should render the subheading', async () => {
      // Arrange.
      subHeading = 'Test Sub Heading';
      const target = await createTestTarget();
      // Act.
      const actual = await target.subHeading();
      // Assert
      expect(actual).toEqual(subHeading);
    });

    it('should return null if no subHeading is supplied', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.subHeading();
      // Assert
      expect(actual).toEqual('');
    });
  });

  describe('Content', () => {
    it('should render the content', async () => {
      // Arrange.
      content = 'Test Content';
      const target = await createTestTarget();
      // Act.
      const _content = await target.content();
      const actual = await _content.text();
      // Assert.
      expect(actual).toEqual(content);
    });
  });

  describe('Footer', () => {
    it('should render the footer if supplied', async () => {
      // Arrange.
      footer = 'Test Footer';
      const target = await createTestTarget();
      // Act.
      const _footer = await target.footer();
      const actual = await _footer?.text();
      // Assert.
      expect(actual).toEqual(footer);
    });

    it('should not render the footer if it is undefined', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.footer();
      // Assert
      expect(actual).toBeNull();
    });
  });
});
