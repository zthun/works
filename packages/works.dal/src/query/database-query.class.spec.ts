import { ZDatabaseQuery } from './database-query.class';
import { FilterQuery, JoinCriteria, SortAscending, SortCriteria, SortDescending } from './database-query.interface';

describe('ZDatabaseQuery', () => {
  let invoke: (query: ZDatabaseQuery<any>) => Promise<any>;
  let filter: FilterQuery<any>;
  let sort: SortCriteria;
  let join: JoinCriteria;
  let page: number;
  let size: number;

  beforeEach(() => {
    page = 5;
    size = 100;

    filter = {
      name: { $eq: 'Fred' }
    };

    sort = [
      {
        key: 'name',
        direction: SortAscending
      },
      {
        key: '_id',
        direction: SortDescending
      }
    ];

    join = [
      {
        from: 'Jetsons',
        local: 'name',
        foreign: 'name',
        as: 'friends'
      },
      {
        from: 'Simpsons',
        local: 'name',
        foreign: 'name',
        as: 'enemies'
      }
    ];

    invoke = jest.fn((options) => Promise.resolve(options));
  });

  async function assertOptions<T>(expected: T, build: () => ZDatabaseQuery<any>, actualFn: (options: ZDatabaseQuery<any>) => T) {
    // Arrange
    const target = build();
    // Act
    const used = await target.run();
    const actual = actualFn(used);
    // Assert
    expect(actual).toEqual(expected);
  }

  async function assertCopies<T>(expected: T, build: () => ZDatabaseQuery<any>, actualFn: (q: ZDatabaseQuery<any>) => T) {
    // Arrange
    const target = new ZDatabaseQuery(invoke);
    const other = build();
    // Act
    const query = await target.copy(other).run();
    const actual = actualFn(query);
    // Assert
    expect(actual).toEqual(expected);
  }

  it('sets the filter.', async () => {
    await assertOptions(filter, () => new ZDatabaseQuery(invoke).filter(filter), (q) => q.$filter);
  });

  it('sets the sort.', async () => {
    await assertOptions(sort, () => new ZDatabaseQuery(invoke).sorts(sort), (q) => q.$sort);
  });

  it('adds sorts.', async () => {
    const [a, b] = sort;
    await assertOptions(sort, () => new ZDatabaseQuery(invoke).sort(a.key, a.direction).sort(b.key, b.direction), (q) => q.$sort);
  });

  it('sets the join.', async () => {
    await assertOptions(join, () => new ZDatabaseQuery(invoke).joins(join), (q) => q.$join);
  });

  it('adds a join.', async () => {
    const [a, b] = join;
    await assertOptions(join, () => new ZDatabaseQuery(invoke).join(a.from, a.local, a.foreign, a.as).join(b.from, b.local, b.foreign, b.as), (q) => q.$join);
  });

  it('sets the page.', async () => {
    await assertOptions(page, () => new ZDatabaseQuery(invoke).page(page), (q) => q.$page);
  });

  it('sets the page size.', async () => {
    await assertOptions(size, () => new ZDatabaseQuery(invoke).size(size), (q) => q.$size);
  });

  it('copies the filter.', async () => {
    await assertCopies(filter, () => new ZDatabaseQuery(invoke).filter(filter), (q) => q.$filter);
  });

  it('copies the sort.', async () => {
    await assertCopies(sort, () => new ZDatabaseQuery(invoke).sorts(sort), (q) => q.$sort);
  });

  it('copies the page.', async () => {
    await assertCopies(page, () => new ZDatabaseQuery(invoke).page(page), (q) => q.$page);
  });

  it('copies the page size.', async () => {
    await assertCopies(size, () => new ZDatabaseQuery(invoke).size(size), (q) => q.$size);
  });
});
