/* eslint-disable require-jsdoc */
import { assertBuilderAssignsObject, assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { v4 } from 'uuid';
import { IZAlert, ZAlertBuilder, ZAlertSeverity } from './alert';

describe('ZAlertBuilder', () => {
  function createTestTarget() {
    return new ZAlertBuilder();
  }

  describe('Properties', () => {
    it('sets the id.', () => {
      assertBuilderSetsProperty(
        v4(),
        createTestTarget,
        (t, v) => t.success().id(v),
        (a: IZAlert) => a._id
      );
    });

    it('sets the message.', () => {
      assertBuilderSetsProperty(
        'Message',
        createTestTarget,
        (t, v) => t.success().message(v),
        (a: IZAlert) => a.message
      );
    });

    it('sets the messages to a newline delimited string if an array is passed.', () => {
      assertBuilderSetsProperty(
        'Line1\nLine2\nLine3',
        createTestTarget,
        (t) => t.success().message(['Line1', 'Line2', 'Line3']),
        (a: IZAlert) => a.message
      );
    });

    it('sets the time to live.', () => {
      assertBuilderSetsProperty(
        1000,
        createTestTarget,
        (t, v) => t.time(v).success(),
        (a: IZAlert) => a.timeToLive
      );
    });

    it('sets the time to live forever.', () => {
      assertBuilderSetsProperty(
        Infinity,
        createTestTarget,
        (t) => t.immortal().success(),
        (a: IZAlert) => a.timeToLive
      );
    });

    it('sets the header.', () => {
      assertBuilderSetsProperty(
        'Header',
        createTestTarget,
        (t, v) => t.header(v),
        (a: IZAlert) => a.header
      );
    });

    describe('SUCCESS', () => {
      it('sets the severity.', () => {
        assertBuilderSetsProperty(
          ZAlertSeverity.Success,
          createTestTarget,
          (t) => t.success(),
          (a: IZAlert) => a.severity
        );
      });
    });

    describe('WARNING', () => {
      it('sets the severity.', () => {
        assertBuilderSetsProperty(
          ZAlertSeverity.Warning,
          createTestTarget,
          (t) => t.warning(),
          (a: IZAlert) => a.severity
        );
      });
    });

    describe('INFO', () => {
      it('sets the severity.', () => {
        assertBuilderSetsProperty(
          ZAlertSeverity.Info,
          createTestTarget,
          (t) => t.info(),
          (a: IZAlert) => a.severity
        );
      });
    });

    describe('ERROR', () => {
      it('sets the severity.', () => {
        assertBuilderSetsProperty(
          ZAlertSeverity.Error,
          createTestTarget,
          (t) => t.error(),
          (a: IZAlert) => a.severity
        );
      });
    });
  });

  describe('Copy', () => {
    it('copies the other alert.', () => {
      const expected = createTestTarget().info().message('message').header('header').build();
      assertBuilderCopiesObject(expected, createTestTarget);
    });
  });

  describe('Assign', () => {
    it('assigns the partial alert.', () => {
      const expected = createTestTarget().message('updated-warning').build();
      assertBuilderAssignsObject(expected, () => createTestTarget().message('warning-message'), {
        message: expected.message
      });
    });
  });
});
