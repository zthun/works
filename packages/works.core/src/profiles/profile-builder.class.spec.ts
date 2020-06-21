import { v4 } from 'uuid';
import { ZUserBuilder } from '../users/user-builder.class';
import { IZUser } from '../users/user.interface';
import { ZProfileBuilder } from './profile-builder.class';
import { IZProfile } from './profile.interface';

describe('ZProfileBuilder', () => {
  function createTestTarget() {
    return new ZProfileBuilder();
  }

  function assertPropertySet<T>(expected: T, buildFn: (target: ZProfileBuilder, value: T) => ZProfileBuilder, actualFn: (user: IZProfile) => T) {
    // Arrange
    const target = createTestTarget();
    // Act
    const user = buildFn(target, expected).build();
    const actual = actualFn(user);
    // Assert
    expect(actual).toEqual(expected);
  }

  describe('Properties', () => {
    it('sets the email.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.email(v),
        (u) => u.email
      );
    });

    it('sets the display.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.display(v),
        (u) => u.display
      );
    });

    it('sets the password.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.password(v),
        (u) => u.password
      );
    });

    it('sets the confirmation.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.confirm(v),
        (u) => u.confirm
      );
    });

    it('auto confirms to the new password.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.password(v).autoConfirm(),
        (u) => u.confirm
      );
    });

    it('marks the profile as a super user.', () => {
      assertPropertySet(
        true,
        (t) => t.super(),
        (u) => u.super
      );
    });
  });

  describe('From user', () => {
    let gambit: IZUser;

    beforeEach(() => {
      gambit = new ZUserBuilder().email('gambit@marvel.com').password('not-a-great-password').display('Gambit').super().build();
    });

    it('copies the email.', () => {
      assertPropertySet(
        gambit.email,
        (t) => t.user(gambit),
        (u) => u.email
      );
    });

    it('copies the display.', () => {
      assertPropertySet(
        gambit.display,
        (t) => t.user(gambit),
        (u) => u.display
      );
    });

    it('copies the super flag.', () => {
      assertPropertySet(
        gambit.super,
        (t) => t.user(gambit),
        (u) => u.super
      );
    });

    it('does not copy the password.', () => {
      assertPropertySet(
        undefined,
        (t) => t.user(gambit),
        (u) => u.password || u.confirm
      );
    });
  });

  describe('Copy and Assignment', () => {
    it('copies another profile.', () => {
      // Arrange
      const profileA = createTestTarget().email(v4()).password(v4()).autoConfirm().build();
      const target = createTestTarget();
      // Act
      const actual = target.copy(profileA).build();
      // Assert
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(profileA));
    });

    it('assigns another profile.', () => {
      // Arrange
      const partial: Partial<IZProfile> = { display: v4() };
      const target = createTestTarget().email(v4()).password(v4()).autoConfirm();
      const expected = createTestTarget().copy(target.build()).display(partial.display).build();
      // Act
      const actual = target.assign(partial).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
