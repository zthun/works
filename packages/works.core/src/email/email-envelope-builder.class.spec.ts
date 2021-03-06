/* eslint-disable require-jsdoc */
import { assertBuilderAssignsObject, assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZEmailContactBuilder } from './email-contact-builder.class';
import { ZEmailEnvelopeBuilder } from './email-envelope-builder.class';
import { IZEmailEnvelope } from './email-envelope.interface';

describe('ZEmailEnvelopeBuilder.', () => {
  function createTestTarget() {
    return new ZEmailEnvelopeBuilder();
  }

  describe('Properties', () => {
    it('should set the from field as a contact.', () => {
      assertBuilderSetsProperty(
        new ZEmailContactBuilder().address('gambit@marvel.com').display('Gambit').type('user').build(),
        createTestTarget,
        (t, v) => t.from(v),
        (c: IZEmailEnvelope) => c.from
      );
    });

    it('should set the from field as a string.', () => {
      assertBuilderSetsProperty(
        'gambit@marvel.com',
        createTestTarget,
        (t, v) => t.from(v),
        (c: IZEmailEnvelope) => c.from
      );
    });

    it('should add a to field.', () => {
      assertBuilderSetsProperty(
        ['gambit@marvel.com', new ZEmailContactBuilder().address('psylocke@marvel.com').display('Psylocke').build()],
        createTestTarget,
        (t, v) => t.to(v[0]).to(v[1]),
        (c: IZEmailEnvelope) => c.to
      );
    });

    it('should set the to field.', () => {
      assertBuilderSetsProperty(
        ['gambit@marvel.com', new ZEmailContactBuilder().address('psylocke@marvel.com').display('Psylocke').build()],
        createTestTarget,
        (t, v) => t.tos(v),
        (c: IZEmailEnvelope) => c.to
      );
    });

    it('should add a cc field.', () => {
      assertBuilderSetsProperty(
        ['gambit@marvel.com', new ZEmailContactBuilder().address('psylocke@marvel.com').display('Psylocke').build()],
        createTestTarget,
        (t, v) => t.cc(v[0]).cc(v[1]),
        (c: IZEmailEnvelope) => c.cc
      );
    });

    it('should set the cc field.', () => {
      assertBuilderSetsProperty(
        ['gambit@marvel.com', new ZEmailContactBuilder().address('psylocke@marvel.com').display('Psylocke').build()],
        createTestTarget,
        (t, v) => t.ccs(v),
        (c: IZEmailEnvelope) => c.cc
      );
    });

    it('should add a bcc field.', () => {
      assertBuilderSetsProperty(
        ['gambit@marvel.com', new ZEmailContactBuilder().address('psylocke@marvel.com').display('Psylocke').build()],
        createTestTarget,
        (t, v) => t.bcc(v[0]).bcc(v[1]),
        (c: IZEmailEnvelope) => c.bcc
      );
    });

    it('should set the bcc field.', () => {
      assertBuilderSetsProperty(
        ['gambit@marvel.com', new ZEmailContactBuilder().address('psylocke@marvel.com').display('Psylocke').build()],
        createTestTarget,
        (t, v) => t.bccs(v),
        (c: IZEmailEnvelope) => c.bcc
      );
    });
  });

  describe('Copy', () => {
    it('should copy another envelope.', () => {
      assertBuilderCopiesObject(createTestTarget().from('gambit@marvel.com').to('rogue@marvel.com').cc('wolverine@marvel.com').cc('cyclops@marvel.com').bcc('x@marvel.com').build(), createTestTarget);
    });
  });

  describe('Assign', () => {
    it('should assign another envelope.', () => {
      const from = 'gambit@marvel.com';
      const to = ['rogue@marvel.com'];
      const cc = ['wolverine@marvel.com', 'cyclops@marvel.com'];
      const bcc = ['x@marvel.com'];
      assertBuilderAssignsObject(createTestTarget().from(from).tos(to).ccs(cc).bccs(bcc).build(), () => createTestTarget().from(from).tos(to), { cc, bcc });
    });
  });
});
