import { describe, expect, it } from 'vitest';
import { ZWebAppBuilder } from './web-app';

describe('ZWebAppBuilder', () => {
  function createTestTarget() {
    return new ZWebAppBuilder();
  }

  describe('Properties', () => {
    it('should set the id.', () => {
      const expected = 'app';
      expect(createTestTarget().id(expected).build()._id).toEqual(expected);
    });

    it('should set the name.', () => {
      const expected = 'App';
      expect(createTestTarget().name(expected).build().name).toEqual(expected);
    });

    it('should set the short.', () => {
      const expected = 'Short';
      expect(createTestTarget().short(expected).build().short).toEqual(expected);
    });

    it('should set the description.', () => {
      const expected = 'Description';
      expect(createTestTarget().description(expected).build().description).toEqual(expected);
    });

    it('should set the domain.', () => {
      const expected = 'https://app.zthunworks.com';
      expect(createTestTarget().domain(expected).build().domain).toEqual(expected);
    });

    it('should set the icon.', () => {
      const expected = 'https://my-icons/sample.png';
      expect(createTestTarget().icon(expected).build().icon).toEqual(expected);
    });

    it('should set the source.', () => {
      const expected = 'https://github.com/zthun/works';
      expect(createTestTarget().source(expected).build().source).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should copy another web app.', () => {
      const expected = createTestTarget()
        .id('learn')
        .description('Documentation')
        .name('Learn')
        .domain('https://docs.zthunworks.com')
        .short('docs')
        .source('https://github.com/zthun/docs')
        .build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
