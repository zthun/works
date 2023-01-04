/* eslint-disable require-jsdoc */
import { v4 } from 'uuid';
import { ZCookieBuilder } from './cookie';

describe('ZCookieBuilder', () => {
  function createTestTarget() {
    return new ZCookieBuilder();
  }

  describe('Properties', () => {
    it('should set the name.', () => {
      const expected = 'CookieName';
      expect(createTestTarget().name(expected).build().name).toEqual(expected);
    });

    it('should set the value.', () => {
      const expected = v4();
      expect(createTestTarget().value(expected).build().value).toEqual(expected);
    });

    it('should set the domain.', () => {
      const expected = 'zthunworks.com';
      expect(createTestTarget().domain(expected).build().domain).toEqual(expected);
    });

    describe('Secure', () => {
      it('should set the secure flag.', () => {
        expect(createTestTarget().secure().build().secure).toBeTruthy();
      });

      it('should turn off the secure flag.', () => {
        expect(createTestTarget().secure(false).build().secure).toBeFalsy();
      });
    });

    describe('Http Only', () => {
      it('should set the http only flag.', () => {
        expect(createTestTarget().httpOnly().build().httpOnly).toBeTruthy();
      });

      it('should turn off the secure flag.', () => {
        expect(createTestTarget().httpOnly(false).build().httpOnly).toBeFalsy();
      });
    });

    describe('Expiration', () => {
      it('should set the expiration date.', () => {
        const expected = new Date().toJSON();
        expect(createTestTarget().expires(expected).build().expires).toEqual(expected);
      });

      it('should set the expiration date to one day from this moment.', () => {
        const expected = new Date(Date.now() + ZCookieBuilder.MillisecondsOneDay).toJSON();
        expect(createTestTarget().expiresTomorrow().build().expires! >= expected).toBeTruthy();
      });

      it('should remove the expiration.', () => {
        expect(createTestTarget().expiresTomorrow().immortal().build().expires).toBeUndefined();
      });
    });

    describe('Same Site', () => {
      it('should be lax.', () => {
        expect(createTestTarget().lax().build().sameSite).toEqual('lax');
      });

      it('should be be strict.', () => {
        expect(createTestTarget().strict().build().sameSite).toEqual('strict');
      });

      it('should be none.', () => {
        expect(createTestTarget().allowCrossSite().build().sameSite).toEqual('none');
      });

      it('should set the secure flag if none.', () => {
        expect(createTestTarget().allowCrossSite().build().secure).toBeTruthy();
      });
    });
  });

  describe('Authentication', () => {
    it('sets the name.', () => {
      const expected = 'Authentication';
      expect(createTestTarget().authentication().build().name).toEqual(expected);
    });

    it('sets the secure flag.', () => {
      expect(createTestTarget().authentication().build().secure).toBeTruthy();
    });

    it('sets the http only flag.', () => {
      expect(createTestTarget().authentication().build().httpOnly).toBeTruthy();
    });

    it('sets the value.', () => {
      const expected = v4();
      expect(createTestTarget().authentication(expected).build().value).toEqual(expected);
    });

    it('expires in 24 hours.', () => {
      const expected = createTestTarget().expiresTomorrow().build().expires!;
      expect(createTestTarget().authentication().build().expires! >= expected).toBeTruthy();
    });
  });
});
