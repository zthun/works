/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZSort, ZSortBuilder, ZSortDirection } from './sort';

describe('Sort Builder', () => {
  function createTestTarget() {
    return new ZSortBuilder();
  }

  it('sets the sort order.', () => {
    const expected: IZSort[] = [
      { field: 'a', direction: ZSortDirection.Ascending },
      { field: 'b', direction: ZSortDirection.Descending }
    ];
    assertBuilderSetsProperty(
      expected,
      createTestTarget,
      (t) => t.ascending('a').descending('b'),
      (s) => s
    );
  });
});
