import { createGuid } from '@zthun/helpful-fn';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { describe, expect, it } from 'vitest';
import { IZProject, ZProjectBuilder } from './project';
import { ZProjectKind } from './project-kind';
import { ZProjectTechnology } from './project-technology';

describe('ZProjectBuilder', () => {
  const createTestTarget = () => new ZProjectBuilder();

  describe('Id', () => {
    it('should set the value', () => {
      const expected = createGuid();
      expect(createTestTarget().id(expected).build()._id).toEqual(expected);
    });
  });

  describe('Name', () => {
    it('should set the value', () => {
      const expected = 'Zthunworks';
      expect(createTestTarget().name(expected).build().name).toEqual(expected);
    });
  });

  describe('Description', () => {
    it('should set the value', () => {
      const expected = 'Portfolio for everything done by zthun';
      expect(createTestTarget().description(expected).build().description).toEqual(expected);
    });
  });

  describe('Icon', () => {
    it('should set the value', () => {
      const expected = new ZUrlBuilder().gravatar().build();
      expect(createTestTarget().icon(expected).build().icon).toEqual(expected);
    });
  });

  describe('Url', () => {
    it('should set the value', () => {
      const expected = 'https://google.com';
      expect(createTestTarget().url(expected).build().url).toEqual(expected);
    });
  });

  describe('Source', () => {
    it('should set the value', () => {
      const expected = new ZUrlBuilder().parse('https://github.com').append('zthun').append('works').build();
      expect(createTestTarget().source(expected).build().source).toEqual(expected);
    });
  });

  describe('Kind', () => {
    it('should default to other', () => {
      expect(createTestTarget().build().kind).toEqual(ZProjectKind.Other);
    });

    it('should set to library', () => {
      expect(createTestTarget().library().build().kind).toEqual(ZProjectKind.Library);
    });

    it('should set to web', () => {
      expect(createTestTarget().web().build().kind).toEqual(ZProjectKind.Web);
    });

    it('should set to desktop', () => {
      expect(createTestTarget().desktop().build().kind).toEqual(ZProjectKind.Desktop);
    });

    it('should set to console', () => {
      expect(createTestTarget().console().build().kind).toEqual(ZProjectKind.Console);
    });
  });

  describe('Technology', () => {
    it('should default to other', () => {
      expect(createTestTarget().build().technology).toEqual(ZProjectTechnology.Other);
    });

    it('should set to java', () => {
      expect(createTestTarget().java().build().technology).toEqual(ZProjectTechnology.Java);
    });

    it('should set to dotnet', () => {
      expect(createTestTarget().dotnet().build().technology).toEqual(ZProjectTechnology.DotNet);
    });

    it('should set to node', () => {
      expect(createTestTarget().node().build().technology).toEqual(ZProjectTechnology.Node);
    });
  });

  describe('Assign', () => {
    it('should assign updated properties', () => {
      // Arrange.
      const target = createTestTarget();
      const expected = target.name('Test').java().console().build();
      const partial: Partial<IZProject> = { name: expected.name, kind: expected.kind, technology: expected.technology };
      // Act.
      const actual = target.assign(partial).build();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should create a deep copy of the assigned project', () => {
      // Arrange.
      const target = createTestTarget();
      const expected = target
        .id('test')
        .name('Test')
        .java()
        .console()
        .icon(new ZUrlBuilder().gravatar().build())
        .url('https://zthunworks.com')
        .source('https://github.com/zthun/works')
        .build();
      // Act.
      const actual = target.copy(expected).build();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});
