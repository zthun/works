/* eslint-disable require-jsdoc */

import { assertBuilderAssignsObject, assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZEmailBuilder } from './email-builder.class';
import { ZEmailEnvelopeBuilder } from './email-envelope-builder.class';
import { IZEmailEnvelope } from './email-envelope.interface';
import { IZEmail } from './email.interface';

describe('ZEmailContactBuilder.', () => {
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
      assertBuilderCopiesObject(createTestTarget().envelope(envelope).message('Missing briefing is in another message.').subject('Mission briefing').build(), createTestTarget);
    });
  });

  describe('Assign', () => {
    it('should assign another email.', () => {
      const subject = 'Mission Briefing';
      const message = 'Check attachments for missing briefing.';
      assertBuilderAssignsObject(createTestTarget().envelope(envelope).subject(subject).message(message).build(), () => createTestTarget().subject(subject), { envelope, message });
    });
  });
});
