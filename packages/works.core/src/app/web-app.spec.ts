/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZWebApp, ZWebAppBuilder } from './web-app';

describe('ZWebAppBuilder', () => {
  function createTestTarget() {
    return new ZWebAppBuilder();
  }

  describe('Properties', () => {
    it('should set the id.', () => {
      assertBuilderSetsProperty(
        'app',
        createTestTarget,
        (t, v) => t.id(v),
        (a: IZWebApp) => a._id
      );
    });

    it('should set the name.', () => {
      assertBuilderSetsProperty(
        'App',
        createTestTarget,
        (t, v) => t.name(v),
        (a: IZWebApp) => a.name
      );
    });

    it('should set the domain.', () => {
      assertBuilderSetsProperty(
        'https://app.zthunworks.com',
        createTestTarget,
        (t, v) => t.domain(v),
        (a: IZWebApp) => a.domain
      );
    });

    it('should set the icon.', () => {
      assertBuilderSetsProperty(
        // cspell:disable-next-line
        'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
        createTestTarget,
        (t, v) => t.icon(v),
        (a: IZWebApp) => a.icon
      );
    });

    it('should set the source.', () => {
      assertBuilderSetsProperty(
        'https://github.com/zthun/works',
        createTestTarget,
        (t, v) => t.source(v),
        (a: IZWebApp) => a.source
      );
    });
  });
});
