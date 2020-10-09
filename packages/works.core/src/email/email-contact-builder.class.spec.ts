/* eslint-disable require-jsdoc */

import { assertBuilderAssignsObject, assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZEmailContactBuilder } from './email-contact-builder.class';
import { IZEmailContact } from './email-contact.interface';

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
      assertBuilderCopiesObject(createTestTarget().address('gambit@marvel.com').display('Gambit').type('user').build(), createTestTarget);
    });
  });

  describe('Assign', () => {
    it('should assign another contact.', () => {
      assertBuilderAssignsObject(createTestTarget().address('gambit@marvel.com').display('Gambit').type('user').build(), () => createTestTarget().address('psylocke@marvel.com').display('Psylocke').type('user'), {
        address: 'gambit@marvel.com',
        display: 'Gambit'
      });
    });
  });
});
