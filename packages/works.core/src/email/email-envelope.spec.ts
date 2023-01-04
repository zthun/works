/* eslint-disable require-jsdoc */
import { IZEmailContact, ZEmailContactBuilder } from './email-contact';
import { IZEmailEnvelope, ZEmailEnvelopeBuilder } from './email-envelope';

describe('ZEmailEnvelopeBuilder.', () => {
  let gambit: string;
  let psylocke: IZEmailContact;

  function createTestTarget() {
    return new ZEmailEnvelopeBuilder();
  }

  beforeEach(() => {
    gambit = 'gambit@marvel.com';
    psylocke = new ZEmailContactBuilder().address('psylocke@marvel.com').display('Psylocke').build();
  });

  describe('Properties', () => {
    it('should set the from field as a contact.', () => {
      const expected = new ZEmailContactBuilder().address('gambit@marvel.com').display('Gambit').type('user').build();
      expect(createTestTarget().from(expected).build().from).toEqual(expected);
    });

    it('should set the from field as a string.', () => {
      const expected = 'gambit@marvel.com';
      expect(createTestTarget().from(expected).build().from).toEqual(expected);
    });

    it('should add a to field.', () => {
      const expected = [gambit, psylocke];
      expect(createTestTarget().to(gambit).to(psylocke).build().to).toEqual(expected);
    });

    it('should set the to field.', () => {
      const expected = [gambit, psylocke];
      expect(createTestTarget().tos(expected).build().to).toEqual(expected);
    });

    it('should add a cc field.', () => {
      const expected = [gambit, psylocke];
      expect(createTestTarget().cc(gambit).cc(psylocke).build().cc).toEqual(expected);
    });

    it('should set the cc field.', () => {
      const expected = [gambit, psylocke];
      expect(createTestTarget().ccs(expected).build().cc).toEqual(expected);
    });

    it('should add a bcc field.', () => {
      const expected = [gambit, psylocke];
      expect(createTestTarget().bcc(gambit).bcc(psylocke).build().bcc).toEqual(expected);
    });

    it('should set the bcc field.', () => {
      const expected = [gambit, psylocke];
      expect(createTestTarget().bccs(expected).build().bcc).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should copy another envelope.', () => {
      const expected = createTestTarget()
        .from('gambit@marvel.com')
        .to('rogue@marvel.com')
        .cc('wolverine@marvel.com')
        .cc('cyclops@marvel.com')
        .bcc('x@marvel.com')
        .build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('should assign another envelope.', () => {
      const from = 'gambit@marvel.com';
      const to = ['rogue@marvel.com'];
      const cc = ['wolverine@marvel.com', 'cyclops@marvel.com'];
      const bcc = ['x@marvel.com'];
      const partial: Partial<IZEmailEnvelope> = { cc, bcc };
      const expected = createTestTarget().from(from).tos(to).ccs(cc).bccs(bcc).build();
      const actual = createTestTarget().from(from).tos(to).assign(partial).build();
      expect(actual).toEqual(expected);
    });
  });
});
