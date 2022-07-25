/* eslint-disable require-jsdoc */
import { assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { v4 } from 'uuid';
import { IZUser, ZUserBuilder } from './user';

describe('ZUserBuilder', () => {
  function createTestTarget() {
    return new ZUserBuilder();
  }

  describe('Properties', () => {
    it('sets the id.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.id(v),
        (u: IZUser) => u._id
      );
    });

    it('sets the email.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.email(v),
        (u: IZUser) => u.email
      );
    });

    it('sets the display.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.display(v),
        (u: IZUser) => u.display
      );
    });

    it('sets the password.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.password(v),
        (u: IZUser) => u.password
      );
    });

    it('sets the user inactive.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.inactive(v),
        (u: IZUser) => u.activator?.key
      );
    });

    it('sets the user inactive activator expiration.', () => {
      // Arrange
      const time = 2400;
      const expected = new Date().getTime() + time;
      const target = createTestTarget();
      // Act
      const actual = target.inactive(v4(), time).build();
      // Assert
      expect(actual.activator?.exp).toBeGreaterThanOrEqual(expected);
    });

    it('sets the user active', () => {
      assertBuilderSetsProperty(
        null,
        createTestTarget,
        (t) => t.inactive(v4()).active(),
        (u: IZUser) => u.activator
      );
    });

    it('sets the user recovery.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.recover(v),
        (u: IZUser) => u.recovery?.password
      );
    });

    it('sets the user recovery exp.', () => {
      // Arrange
      const time = 2400;
      const expected = new Date().getTime() + time;
      const target = createTestTarget();
      // Act
      const actual = target.recover(v4(), time).build();
      // Assert
      expect(actual.recovery?.exp).toBeGreaterThanOrEqual(expected);
    });

    it('sets the the user recovery password to null on login.', () => {
      assertBuilderSetsProperty(
        null,
        createTestTarget,
        (t) => t.recover(v4()).login(),
        (u: IZUser) => u.recovery
      );
    });

    it('sets a timestamp of the last user login.', () => {
      assertBuilderSetsProperty(
        true,
        createTestTarget,
        (t) => t.recover(v4()).login(),
        (u: IZUser) => !!u.login
      );
    });

    it('sets the super flag.', () => {
      assertBuilderSetsProperty(
        true,
        createTestTarget,
        (t) => t.super(),
        (u: IZUser) => u.super
      );
    });

    it('sets the avatar.', () => {
      assertBuilderSetsProperty(
        'image-data',
        createTestTarget,
        (t, v) => t.avatar(v),
        (u: IZUser) => u.avatar
      );
    });
  });

  describe('Copy', () => {
    it('copies another user.', () => {
      const userA = createTestTarget().email(v4()).password(v4()).id(v4()).inactive('some-activator-password').recover('some-recovery-password', 1000).build();
      assertBuilderCopiesObject(userA, createTestTarget);
    });
  });
});
