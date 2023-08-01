import { beforeEach, describe, expect, it } from 'vitest';

import { ZEmailBuilder } from './email';
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
      expect(createTestTarget().envelope(envelope).build().envelope).toEqual(envelope);
    });

    it('should set the subject.', () => {
      const expected = 'New missing assignment';
      expect(createTestTarget().subject(expected).build().subject).toEqual(expected);
    });

    it('should set the message.', () => {
      const expected = '<div>See attachment for details of the assignment.</div>';
      expect(createTestTarget().message(expected).build().message).toEqual(expected);
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
