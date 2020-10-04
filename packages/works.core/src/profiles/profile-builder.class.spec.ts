import { v4 } from 'uuid';
import { ZUserBuilder } from '../users/user-builder.class';
import { IZUser } from '../users/user.interface';
import { ZProfileBuilder } from './profile-builder.class';
import { IZProfile } from './profile.interface';
import { assertBuilderAssignsObject, assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';

describe('ZProfileBuilder', () => {
  function createTestTarget() {
    return new ZProfileBuilder();
  }

  describe('Properties', () => {
    it('sets the email.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.email(v),
        (u: IZProfile) => u.email
      );
    });

    it('sets the display.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.display(v),
        (u: IZProfile) => u.display
      );
    });

    it('sets the password.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.password(v),
        (u: IZProfile) => u.password
      );
    });

    it('sets the confirmation.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.confirm(v),
        (u: IZProfile) => u.confirm
      );
    });

    it('auto confirms to the new password.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.password(v).autoConfirm(),
        (u: IZProfile) => u.confirm
      );
    });

    it('marks the profile as active.', () => {
      assertBuilderSetsProperty(
        true,
        createTestTarget,
        (t) => t.active(),
        (u: IZProfile) => u.active
      );
    });

    it('sets the avatar.', () => {
      assertBuilderSetsProperty(
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        createTestTarget,
        (t, v) => t.avatar(v),
        (u: IZProfile) => u.avatar
      );
    });
  });

  describe('From user', () => {
    let gambit: IZUser;

    beforeEach(() => {
      gambit = new ZUserBuilder().email('gambit@marvel.com').password('not-a-great-password').display('Gambit').avatar('https://steamavatar.io/img/14777429602y3IT.jpg').active().super().build();
    });

    it('copies the email.', () => {
      assertBuilderSetsProperty(
        gambit.email,
        createTestTarget,
        (t) => t.user(gambit),
        (u: IZProfile) => u.email
      );
    });

    it('copies the display.', () => {
      assertBuilderSetsProperty(
        gambit.display,
        createTestTarget,
        (t) => t.user(gambit),
        (u: IZProfile) => u.display
      );
    });

    it('copies the avatar.', () => {
      assertBuilderSetsProperty(
        gambit.avatar,
        createTestTarget,
        (t) => t.user(gambit),
        (u: IZProfile) => u.avatar
      );
    });

    it('does not copy the password.', () => {
      assertBuilderSetsProperty(
        undefined,
        createTestTarget,
        (t) => t.user(gambit),
        (u: IZProfile) => u.password || u.confirm
      );
    });

    it('marks the profile as active if there is no activator code.', () => {
      assertBuilderSetsProperty(
        true,
        createTestTarget,
        (t) => t.user(gambit),
        (u: IZProfile) => u.active
      );
    });

    it('marks the profile as inactive if there is an activator code.', () => {
      assertBuilderSetsProperty(
        false,
        createTestTarget,
        (t) => t.user(new ZUserBuilder().copy(gambit).inactive(v4()).build()),
        (u: IZProfile) => u.active
      );
    });
  });

  describe('Copy and Assignment', () => {
    it('copies another profile.', () => {
      const gambit = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').avatar('https://steamavatar.io/img/14777429602y3IT.jpg').build();
      assertBuilderCopiesObject(gambit, createTestTarget);
    });

    it('assigns another profile.', () => {
      const gambit = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').build();
      assertBuilderAssignsObject(gambit, createTestTarget, { email: 'gambit@marvel.com', display: 'Gambit' });
    });
  });
});
