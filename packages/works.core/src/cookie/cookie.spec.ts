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
        'CookieName',
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
      it('should set the expiration date.', () => {
        const expected = new Date(Date.now());
        assertBuilderSetsProperty(
          expected.toJSON(),
          createTestTarget,
          (t) => t.expires(expected),
          (c: IZCookie) => c.expires
        );
      });

      it('should set the expiration date to one day from this moment.', () => {
        const expected = new Date(Date.now() + ZCookieBuilder.MillisecondsOneDay).toJSON();
        assertBuilderSetsProperty(
          true,
          createTestTarget,
          (t) => t.expiresTomorrow(),
          (c: IZCookie) => c.expires >= expected
        );
      });

      it('should remove the expiration.', () => {
        assertBuilderSetsProperty(
          undefined,
          createTestTarget,
          (t) => t.expiresTomorrow().immortal(),
          (c: IZCookie) => c.expires
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

  describe('Authentication', () => {
    it('sets the name.', () => {
      assertBuilderSetsProperty(
        'Authentication',
        createTestTarget,
        (t) => t.authentication(),
        (c: IZCookie) => c.name
      );
    });

    it('sets the secure flag.', () => {
      assertBuilderSetsProperty(
        true,
        createTestTarget,
        (t) => t.authentication(),
        (c: IZCookie) => c.secure
      );
    });

    it('sets the http only flag.', () => {
      assertBuilderSetsProperty(
        true,
        createTestTarget,
        (t) => t.authentication(),
        (c: IZCookie) => c.httpOnly
      );
    });

    it('sets the value.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.authentication(v),
        (c: IZCookie) => c.value
      );
    });

    it('expires in 24 hours.', () => {
      const expected = createTestTarget().expiresTomorrow().build().expires;
      assertBuilderSetsProperty(
        true,
        createTestTarget,
        (t) => t.authentication(),
        (c: IZCookie) => c.expires >= expected
      );
    });
  });
});
