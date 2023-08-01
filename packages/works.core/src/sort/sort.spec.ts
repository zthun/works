import { describe, expect, it } from 'vitest';
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
    expect(createTestTarget().ascending('a').descending('b').build()).toEqual(expected);
  });
});
