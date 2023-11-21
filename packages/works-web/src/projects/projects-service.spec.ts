import { ZDataRequestBuilder, ZPageBuilder } from '@zthun/helpful-query';
import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/webigail-http';
import { IZProject, ZProjectBuilder } from '@zthun/works-portfolio';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZProjectsService } from './projects-service';

describe('ZProjectsService', () => {
  let fashion: IZProject;
  let works: IZProject;
  let all: IZProject[];

  let _http: ZHttpServiceMock;

  const createTestTarget = () => new ZProjectsService(_http);

  beforeEach(() => {
    fashion = new ZProjectBuilder().id('fashion').name('Fashion').build();
    works = new ZProjectBuilder().id('works').name('Works').build();
    all = [fashion, works];

    _http = new ZHttpServiceMock();
  });

  describe('Count', () => {
    it('should return the total count of all projects', async () => {
      // Arrange.
      const target = createTestTarget();
      const url = target.api().page(1).size(1).build();
      const page = new ZPageBuilder().all(all).build();
      _http.set(url, ZHttpMethod.Get, new ZHttpResultBuilder(page).build());
      // Act.
      const actual = await target.count(new ZDataRequestBuilder().build());
      // Assert.
      expect(actual).toEqual(all.length);
    });
  });

  describe('List', () => {
    it('should return the list of all projects', async () => {
      // Arrange.
      const target = createTestTarget();
      const r = new ZDataRequestBuilder().page(1).size(10).search('p').build();
      const url = target.api().page(r.page).size(r.size).search(r.search).build();
      const page = new ZPageBuilder().all(all).build();
      _http.set(url, ZHttpMethod.Get, new ZHttpResultBuilder(page).build());
      // Act.
      const actual = await target.retrieve(r);
      // Assert.
      expect(actual).toEqual(all);
    });
  });
});
