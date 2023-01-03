/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
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

    it('should set the name.', () => {
      assertBuilderSetsProperty(
        'Information',
        createTestTarget,
        (t, v) => t.name(v),
        (r: IZRouteOption) => r.name
      );
    });

    it('should set the description.', () => {
      assertBuilderSetsProperty(
        'Description',
        createTestTarget,
        (t, v) => t.description(v),
        (r: IZRouteOption) => r.description
      );
    });

    it('should set the avatar.', () => {
      assertBuilderSetsProperty(
        '<img src="avatar.png" />',
        createTestTarget,
        (t, v) => t.avatar(v),
        (r: IZRouteOption) => r.avatar
      );
    });

    it('should set the method to get.', () => {
      assertBuilderSetsProperty(
        'get',
        createTestTarget,
        (t) => t.get(),
        (r: IZRouteOption) => r.method
      );
    });

    it('should set the method to put.', () => {
      assertBuilderSetsProperty(
        'put',
        createTestTarget,
        (t) => t.put(),
        (r: IZRouteOption) => r.method
      );
    });

    it('should set the method to post.', () => {
      assertBuilderSetsProperty(
        'post',
        createTestTarget,
        (t) => t.post(),
        (r: IZRouteOption) => r.method
      );
    });

    it('should set the method to delete.', () => {
      assertBuilderSetsProperty(
        'delete',
        createTestTarget,
        (t) => t.delete(),
        (r: IZRouteOption) => r.method
      );
    });

    it('should set the method to patch.', () => {
      assertBuilderSetsProperty(
        'patch',
        createTestTarget,
        (t) => t.patch(),
        (r: IZRouteOption) => r.method
      );
    });

    it('should set the method to head.', () => {
      assertBuilderSetsProperty(
        'head',
        createTestTarget,
        (t) => t.head(),
        (r: IZRouteOption) => r.method
      );
    });

    it('should set the method to options.', () => {
      assertBuilderSetsProperty(
        'options',
        createTestTarget,
        (t) => t.options(),
        (r: IZRouteOption) => r.method
      );
    });
  });

  describe('Copy', () => {
    it('should copy another route option.', () => {
      const avatar = Buffer.from('1234', 'binary');
      const expected = new ZRouteOptionBuilder().head().owner(v4()).avatar(avatar).path('/api/options').build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
