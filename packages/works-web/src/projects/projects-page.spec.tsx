import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZDataSourceStatic } from '@zthun/helpful-query';
import { IZProject, ZProjectBuilder } from '@zthun/works-portfolio';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZProjectsPage } from './projects-page';
import { ZProjectsPageComponentModel } from './projects-page.cm';
import { IZProjectsService, ZProjectsServiceContext } from './projects-service';

describe('ZProjectsPage', () => {
  let works: IZProject;
  let fashion: IZProject;
  let projects: Mocked<IZProjectsService>;

  async function createTestTarget() {
    const element = (
      <ZProjectsServiceContext.Provider value={projects}>
        <ZProjectsPage />;
      </ZProjectsServiceContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZProjectsPageComponentModel);
    const grid = target.asGrid();
    await grid.load();
    return target;
  }

  beforeEach(() => {
    works = new ZProjectBuilder()
      .id('works')
      .name('Zthunworks')
      .description('Zthunworks portfolio')
      .web()
      .node()
      .build();

    fashion = new ZProjectBuilder()
      .id('fashion')
      .name('Fashion')
      .description('Make it look good')
      .library()
      .node()
      .build();

    const _projects = new ZDataSourceStatic([works, fashion]);

    projects = mock<IZProjectsService>();
    projects.count.mockImplementation((r) => _projects.count(r));
    projects.retrieve.mockImplementation((r) => _projects.retrieve(r));
  });

  it('should render the projects list', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const _fashion = await target.project(fashion._id);
    const _works = await target.project(works._id);
    const actual = _fashion && _works;
    // Assert.
    expect(actual).toBeTruthy();
  });
});
