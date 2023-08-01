import { beforeEach, describe, expect, it } from 'vitest';

import { IZEmailContact, ZEmailContactBuilder } from './email-contact';
import { ZEmailContactAddressBuilder } from './email-contact-address';

describe('ZEmailContactAddressBuilder', () => {
  let gambit: string;
  let wolverine: IZEmailContact;
  let psylocke: IZEmailContact;
  let x: string;

  function createTestTarget() {
    return new ZEmailContactAddressBuilder();
  }

  beforeEach(() => {
    gambit = 'gambit@marvel.com';
    wolverine = new ZEmailContactBuilder().address('wolverine@marvel.com').display('Logan').type('x-men').build();
    psylocke = new ZEmailContactBuilder().build();
    x = 'x@marvel.com';
  });

  it('should returns a comma separated list of items.', () => {
    const expected = [gambit, wolverine.address, x].join(', ');
    expect(createTestTarget().addresses([gambit, wolverine]).address(x).build()).toEqual(expected);
  });

  it('should filter out falsy items.', () => {
    const expected = [gambit, wolverine.address, x].join(', ');
    expect(createTestTarget().addresses([gambit, wolverine, psylocke, x]).address('').build()).toEqual(expected);
  });

  it('should respect the delimiter.', () => {
    const expected = [gambit, wolverine.address, x].join(';');
    expect(createTestTarget().addresses([gambit, wolverine]).address(x).delimiter(';').build()).toEqual(expected);
  });

  it('returns empty string for an empty list of addresses.', () => {
    expect(createTestTarget().address('').build()).toEqual('');
  });
});
