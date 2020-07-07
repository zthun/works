import { assertBuilderSetsProperty, assertBuilderCopiesObject, assertBuilderAssignsObject } from '@zthun/works.jest';
import { ZProfileActivationBuilder } from './profile-activation-builder.class';
import { IZProfileActivation } from './profile-activation.interface';
import { v4 } from 'uuid';

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
      assertBuilderCopiesObject(createTestTarget().email('gambit@marvel.com').key(v4()).build(), createTestTarget);
    });
  });

  describe('Assign', () => {
    it('assigns properties from another activation.', () => {
      const key = v4();
      assertBuilderAssignsObject(createTestTarget().email('x@marvel.com').key(key).build(), () => createTestTarget().email('gambit@marvel.com').key(key), { email: 'x@marvel.com' });
    });
  });
});
