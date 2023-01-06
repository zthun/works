/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { ZBreadcrumbsLocation } from './breadcrumbs-location';
import { ZBreadcrumbsComponentModel } from './breadcrumbs.cm';
import { ZTestRouter } from './router-dom';

describe('ZBreadcrumbs', () => {
  describe('Location', () => {
    let path: string;
    let onClick: jest.Mock | undefined;
    let history: MemoryHistory;

    async function createTestTarget() {
      const element = (
        <ZTestRouter navigator={history} location={history.location}>
          <ZBreadcrumbsLocation onClick={onClick} />
        </ZTestRouter>
      );

      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(driver, ZBreadcrumbsComponentModel);
    }

    beforeEach(() => {
      path = '/path/to/resource';
      history = createMemoryHistory({ initialEntries: [path] });
    });

    it('should render each path separated by slash', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const items = await target.items();
      const labels = await Promise.all(items.map((item) => item.label()));
      const actual = `/${labels.join('/')}`;
      // Assert.
      expect(actual).toEqual(path);
    });

    it('should retrieve a breadcrumb by name', async () => {
      // Arrange.
      const expected = '/path/to';
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.item(expected))?.name();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return null if the breadcrumb cannot be found', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.item('/path/not/found');
      // Assert.
      expect(actual).toBeNull();
    });

    it('should raise the onClick event with the breadcrumb clicked href', async () => {
      // Arrange.
      onClick = jest.fn();
      const target = await createTestTarget();
      // Act.
      const link = await target.item('/path/to');
      const expected = await link?.reference();
      await link?.click();
      // Assert.
      expect(onClick).toHaveBeenCalledWith(expected);
    });
  });
});
