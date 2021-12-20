/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { v4 } from 'uuid';
import { IZCookie, ZCookieBuilder } from './cookie';

describe('ZCookieBuilder', () => {
  function createTestTarget() {
    return new ZCookieBuilder();
  }

  describe('Properties', () => {
    it('should set the name.', () => {
      assertBuilderSetsProperty(
        'Authentication',
        createTestTarget,
        (t, v) => t.name(v),
        (c: IZCookie) => c.name
      );
    });

    it('should set the value.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.value(v),
        (c: IZCookie) => c.value
      );
    });

    it('should set the domain.', () => {
      assertBuilderSetsProperty(
        'zthunworks.com',
        createTestTarget,
        (t, v) => t.domain(v),
        (c: IZCookie) => c.domain
      );
    });

    describe('Secure', () => {
      it('should set the secure flag.', () => {
        assertBuilderSetsProperty(
          true,
          createTestTarget,
          (t) => t.secure(),
          (c: IZCookie) => c.secure
        );
      });

      it('should turn off the secure flag.', () => {
        assertBuilderSetsProperty(
          false,
          createTestTarget,
          (t) => t.secure(false),
          (c: IZCookie) => c.secure
        );
      });
    });

    describe('Http Only', () => {
      it('should set the http only flag.', () => {
        assertBuilderSetsProperty(
          true,
          createTestTarget,
          (t) => t.httpOnly(),
          (c: IZCookie) => c.httpOnly
        );
      });

      it('should turn off the secure flag.', () => {
        assertBuilderSetsProperty(
          false,
          createTestTarget,
          (t) => t.httpOnly(false),
          (c: IZCookie) => c.httpOnly
        );
      });
    });

    describe('Expiration', () => {
      it('should set the expiration date to one day from this moment.', () => {
        const expected = new Date(Date.now() + ZCookieBuilder.MillisecondsOneDay).getTime();
        assertBuilderSetsProperty(
          true,
          createTestTarget,
          (t) => t.expiresTomorrow(),
          (c: IZCookie) => c.expires.getTime() >= expected
        );
      });
    });

    describe('Same Site', () => {
      it('should be lax.', () => {
        assertBuilderSetsProperty(
          'lax',
          createTestTarget,
          (t) => t.lax(),
          (c: IZCookie) => c.sameSite
        );
      });

      it('should be be strict.', () => {
        assertBuilderSetsProperty(
          'strict',
          createTestTarget,
          (t) => t.strict(),
          (c: IZCookie) => c.sameSite
        );
      });

      it('should be none.', () => {
        assertBuilderSetsProperty(
          'none',
          createTestTarget,
          (t) => t.allowCrossSite(),
          (c: IZCookie) => c.sameSite
        );
      });

      it('should set the secure flag if none.', () => {
        assertBuilderSetsProperty(
          true,
          createTestTarget,
          (t) => t.allowCrossSite(),
          (c: IZCookie) => c.secure
        );
      });
    });
  });
});
