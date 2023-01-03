/* eslint-disable require-jsdoc */
import { v4 } from 'uuid';
import { ZAlertBuilder, ZAlertSeverity } from './alert';

describe('ZAlertBuilder', () => {
  function createTestTarget() {
    return new ZAlertBuilder();
  }

  describe('Properties', () => {
    it('sets the id.', () => {
      const expected = v4();
      expect(createTestTarget().success().id(expected).build()._id).toEqual(expected);
    });

    it('sets the message.', () => {
      const expected = 'Message';
      expect(createTestTarget().success().message(expected).build().message).toEqual(expected);
    });

    it('sets the messages to a newline delimited string if an array is passed.', () => {
      const expected = 'Line1\nLine2\nLine3';
      expect(createTestTarget().success().message(['Line1', 'Line2', 'Line3']).build().message).toEqual(expected);
    });

    it('sets the time to live.', () => {
      const expected = 1000;
      expect(createTestTarget().time(expected).success().build().timeToLive).toEqual(expected);
    });

    it('sets the time to live forever.', () => {
      expect(createTestTarget().immortal().success().build().timeToLive).toEqual(Infinity);
    });

    it('sets the header.', () => {
      const expected = 'Header';
      expect(createTestTarget().header(expected).build().header).toEqual(expected);
    });

    describe('SUCCESS', () => {
      it('sets the severity.', () => {
        expect(createTestTarget().success().build().severity).toEqual(ZAlertSeverity.Success);
      });
    });

    describe('WARNING', () => {
      it('sets the severity.', () => {
        expect(createTestTarget().warning().build().severity).toEqual(ZAlertSeverity.Warning);
      });
    });

    describe('INFO', () => {
      it('sets the severity.', () => {
        expect(createTestTarget().info().build().severity).toEqual(ZAlertSeverity.Info);
      });
    });

    describe('ERROR', () => {
      it('sets the severity.', () => {
        expect(createTestTarget().error().build().severity).toEqual(ZAlertSeverity.Error);
      });
    });
  });

  describe('Copy', () => {
    it('copies the other alert.', () => {
      const expected = createTestTarget().info().message('message').header('header').build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('assigns the partial alert.', () => {
      const expected = createTestTarget().message('updated-warning').build();
      const actual = createTestTarget().assign(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
