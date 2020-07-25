import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZSortDirection } from './sort-direction.enum';
import { ZSortBuilder } from './sort-builder.class';
import { IZSort } from './sort.interface';

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
