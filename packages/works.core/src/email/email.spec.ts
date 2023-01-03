/* eslint-disable require-jsdoc */

import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZEmail, ZEmailBuilder } from './email';
import { IZEmailEnvelope, ZEmailEnvelopeBuilder } from './email-envelope';

describe('ZEmailBuilder.', () => {
  let envelope: IZEmailEnvelope;

  beforeEach(() => {
    envelope = new ZEmailEnvelopeBuilder().from('x@marvel.com').to('xmen@marvel.com').build();
  });

  function createTestTarget() {
    return new ZEmailBuilder();
  }

  describe('Properties', () => {
    it('should set the envelope.', () => {
      assertBuilderSetsProperty(
        envelope,
        createTestTarget,
        (t, v) => t.envelope(v),
        (c: IZEmail) => c.envelope
      );
    });

    it('should set the subject.', () => {
      assertBuilderSetsProperty(
        'New mission assignment',
        createTestTarget,
        (t, v) => t.subject(v),
        (c: IZEmail) => c.subject
      );
    });

    it('should set the message.', () => {
      assertBuilderSetsProperty(
        '<div>See attachment for details of the assignment.</div>',
        createTestTarget,
        (t, v) => t.message(v),
        (c: IZEmail) => c.message
      );
    });
  });

  describe('Copy', () => {
    it('should copy another email.', () => {
      const expected = createTestTarget()
        .envelope(envelope)
        .message('Missing briefing is in another message.')
        .subject('Mission briefing')
        .build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('should assign another email.', () => {
      const subject = 'Mission Briefing';
      const message = 'Check attachments for missing briefing.';
      const expected = createTestTarget().envelope(envelope).subject(subject).message(message).build();
      const actual = createTestTarget().subject(subject).assign({ envelope, message }).build();
      expect(actual).toEqual(expected);
    });
  });
});
