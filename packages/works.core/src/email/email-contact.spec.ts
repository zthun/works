import { describe, expect, it } from 'vitest';

import { IZEmailContact, ZEmailContactBuilder } from './email-contact';

describe('ZEmailContactBuilder.', () => {
  function createTestTarget() {
    return new ZEmailContactBuilder();
  }

  describe('Properties', () => {
    it('should set the address.', () => {
      const expected = 'gambit@marvel.com';
      expect(createTestTarget().address(expected).build().address).toEqual(expected);
    });

    it('should set the type.', () => {
      const expected = 'user';
      expect(createTestTarget().type(expected).build().type).toEqual(expected);
    });

    it('should set the display.', () => {
      const expected = 'Gambit';
      expect(createTestTarget().display(expected).build().display).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should copy another contact.', () => {
      const expected = createTestTarget().address('gambit@marvel.com').display('Gambit').type('user').build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('should assign another contact.', () => {
      const partial: Partial<IZEmailContact> = {
        address: 'gambit@marvel.com',
        display: 'Gambit',
        type: 'user'
      };
      const expected = createTestTarget().address('gambit@marvel.com').display('Gambit').type('user').build();
      const actual = createTestTarget().assign(partial).build();
      expect(actual).toEqual(expected);
    });
  });
});
