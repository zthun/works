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
  });
});
