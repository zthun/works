/* eslint-disable require-jsdoc */

import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { identity } from 'lodash';
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
    assertBuilderSetsProperty([gambit, wolverine.address, x].join(', '), createTestTarget, (t) => t.addresses([gambit, wolverine]).address(x), identity);
  });

  it('should filter out falsy items.', () => {
    assertBuilderSetsProperty([gambit, wolverine.address, x].join(', '), createTestTarget, (t) => t.addresses([gambit, wolverine]).address(psylocke).address('').address(x), identity);
  });

  it('should respect the delimiter.', () => {
    assertBuilderSetsProperty([gambit, wolverine.address, x].join('; '), createTestTarget, (t) => t.addresses([gambit, wolverine]).address(x).delimiter('; '), identity);
  });

  it('returns empty string for an empty list of addresses.', () => {
    assertBuilderSetsProperty('', createTestTarget, (t) => t.address(''), identity);
  });
});
