/* eslint-disable require-jsdoc */
import { ZHttpMethod } from '@zthun/works.http';
import { assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { v4 } from 'uuid';
import { IZRouteOption, ZRouteOptionBuilder } from './route-option';

describe('ZRouteOptionBuilder', () => {
  function createTestTarget() {
    return new ZRouteOptionBuilder();
  }

  describe('Properties', () => {
    it('should set the owner.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.owner(v),
        (r: IZRouteOption) => r.owner
      );
    });

    it('should set the path.', () => {
      assertBuilderSetsProperty(
        '/api/health',
        createTestTarget,
        (t, v) => t.path(v),
        (r: IZRouteOption) => r.path
      );
    });

    it('should set the method.', () => {
      assertBuilderSetsProperty(
        ZHttpMethod.Post,
        createTestTarget,
        (t, v) => t.method(v),
        (r: IZRouteOption) => r.method
      );
    });
  });

  describe('Copy', () => {
    it('should copy another route option.', () => {
      const expected = new ZRouteOptionBuilder().method(ZHttpMethod.Put).owner(v4()).path('/api/options').build();
      assertBuilderCopiesObject(expected, createTestTarget);
    });
  });
});
