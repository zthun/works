/* eslint-disable require-jsdoc */

import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZEmailContact, ZEmailContactBuilder } from './email-contact';

describe('ZEmailContactBuilder.', () => {
  function createTestTarget() {
    return new ZEmailContactBuilder();
  }

  describe('Properties', () => {
    it('should set the address.', () => {
      assertBuilderSetsProperty(
        'gambit@marvel.com',
        createTestTarget,
        (t, v) => t.address(v),
        (c: IZEmailContact) => c.address
      );
    });

    it('should set the type.', () => {
      assertBuilderSetsProperty(
        'user',
        createTestTarget,
        (t, v) => t.type(v),
        (c: IZEmailContact) => c.type
      );
    });

    it('should set the display.', () => {
      assertBuilderSetsProperty(
        'Gambit',
        createTestTarget,
        (t, v) => t.display(v),
        (c: IZEmailContact) => c.display
      );
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
