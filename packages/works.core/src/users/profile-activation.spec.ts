/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { v4 } from 'uuid';
import { IZProfileActivation, ZProfileActivationBuilder } from './profile-activation';

describe('ZProfileActivationBuilder', () => {
  function createTestTarget() {
    return new ZProfileActivationBuilder();
  }

  describe('Properties', () => {
    it('sets the email.', () => {
      assertBuilderSetsProperty(
        'gambit@marvel.com',
        createTestTarget,
        (t, v) => t.email(v),
        (a: IZProfileActivation) => a.email
      );
    });

    it('sets the key.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.key(v),
        (a: IZProfileActivation) => a.key
      );
    });
  });

  describe('Copy', () => {
    it('copies another profile activation.', () => {
      const expected = createTestTarget().email('gambit@marvel.com').key(v4()).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('assigns properties from another activation.', () => {
      const key = v4();
      const email = 'x@marvel.com';
      const expected = createTestTarget().email('x@marvel.com').key(key).build();
      const actual = createTestTarget().email('gambit@marvel.com').key(key).assign({ email }).build();
      expect(actual).toEqual(expected);
    });
  });
});
