import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';
import { ZRouteOptionBuilder } from './route-option';

describe('ZRouteOptionBuilder', () => {
  function createTestTarget() {
    return new ZRouteOptionBuilder();
  }

  describe('Properties', () => {
    it('should set the owner.', () => {
      const expected = v4();
      expect(createTestTarget().owner(expected).build().owner).toEqual(expected);
    });

    it('should set the path.', () => {
      const expected = '/api/health';
      expect(createTestTarget().path(expected).build().path).toEqual(expected);
    });

    it('should set the name.', () => {
      const expected = 'Information';
      expect(createTestTarget().name(expected).build().name).toEqual(expected);
    });

    it('should set the description.', () => {
      const expected = v4();
      expect(createTestTarget().description(expected).build().description).toEqual(expected);
    });

    it('should set the avatar.', () => {
      const expected = '<img src="avatar.png" />';
      expect(createTestTarget().avatar(expected).build().avatar).toEqual(expected);
    });

    it('should set the method to get.', () => {
      expect(createTestTarget().get().build().method).toEqual('get');
    });

    it('should set the method to put.', () => {
      expect(createTestTarget().put().build().method).toEqual('put');
    });

    it('should set the method to post.', () => {
      expect(createTestTarget().post().build().method).toEqual('post');
    });

    it('should set the method to delete.', () => {
      expect(createTestTarget().delete().build().method).toEqual('delete');
    });

    it('should set the method to patch.', () => {
      expect(createTestTarget().patch().build().method).toEqual('patch');
    });

    it('should set the method to head.', () => {
      expect(createTestTarget().head().build().method).toEqual('head');
    });

    it('should set the method to options.', () => {
      expect(createTestTarget().options().build().method).toEqual('options');
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
