import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import { ZWindowServiceContext } from "@zthun/helpful-react";
import type { IZProject } from "@zthun/works-portfolio";
import { ZProjectBuilder } from "@zthun/works-portfolio";
import type { Mocked } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";
import { mock } from "vitest-mock-extended";

import { ZProjectsPageComponentModel } from "./projects-page.cm.mjs";
import { ZProjectsPage } from "./projects-page.js";
import type { IZProjectsService } from "./projects-service.mjs";
import { ZProjectsServiceContext } from "./projects-service.mjs";

describe("ZProjectsPage", () => {
  let works: IZProject;
  let fashion: IZProject;
  let projects: Mocked<IZProjectsService>;
  let _window: Mocked<Window>;

  async function createTestTarget() {
    const win = _window as unknown as typeof globalThis;

    const element = (
      <ZWindowServiceContext value={win}>
        <ZProjectsServiceContext value={projects}>
          <ZProjectsPage />
        </ZProjectsServiceContext>
      </ZWindowServiceContext>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZProjectsPageComponentModel);
    const grid = target.asGrid();
    await (await grid.suspense()).load();
    return target;
  }

  beforeEach(() => {
    works = new ZProjectBuilder()
      .id("works")
      .name("Zthunworks")
      .description("Zthunworks portfolio")
      .web()
      .node()
      .build();

    fashion = new ZProjectBuilder()
      .id("fashion")
      .name("Fashion")
      .description("Make it look good")
      .library()
      .node()
      .build();

    const _projects = new ZDataSourceStatic([works, fashion]);

    projects = mock<IZProjectsService>();
    projects.count.mockImplementation((r) => _projects.count(r));
    projects.retrieve.mockImplementation((r) => _projects.retrieve(r));

    _window = mock<Window>();
  });

  it("should render the projects list", async () => {
    // Arrange.
    const target = await createTestTarget();
    const expected = await projects.retrieve(new ZDataRequestBuilder().build());
    // Act.
    const actual = await target.projects();
    // Assert.
    expect(actual.length).toEqual(expected.length);
  });

  it("should open the source code for a project", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const _fashion = await target.project(fashion._id);
    await _fashion!.openSource();
    // Assert.
    expect(_window.open).toHaveBeenCalledWith(fashion.source, "_blank");
  });

  it("should open the url for a project", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const _fashion = await target.project(fashion._id);
    await _fashion!.openUrl();
    // Assert.
    expect(_window.open).toHaveBeenCalledWith(fashion.url, "_blank");
  });
});
