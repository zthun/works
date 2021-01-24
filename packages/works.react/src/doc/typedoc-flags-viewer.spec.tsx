/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import { IZTypedocFlags } from '@zthun/works.core';
import React from 'react';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';

describe('ZTypedocFlagsViewer', () => {
  let flags: IZTypedocFlags;

  function createTestTarget() {
    return render(<ZTypedocFlagsViewer flags={flags} />);
  }

  beforeEach(() => {
    flags = {};
  });

  function assertRendersFlag(flag: string) {
    // Arrange
    const target = createTestTarget();
    const query = `.ZTypedocFlagsViewer-flag-${flag}`;
    // Act
    const actual = target.container.querySelector(query);
    // Assert
    expect(actual).toBeTruthy();
  }

  function assertRendersNothing() {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.container.querySelectorAll('.ZTypedocFlagsViewer-flag ');
    // Assert
    expect(actual.length).toEqual(0);
  }

  describe('Falsy', () => {
    beforeEach(() => {
      flags = null;
    });

    it('should render nothing.', () => {
      assertRendersNothing();
    });
  });

  describe('None', () => {
    it('should render nothing.', () => {
      assertRendersNothing();
    });
  });

  describe('Abstract', () => {
    beforeEach(() => {
      flags.isAbstract = true;
    });

    it('should render the flag.', () => {
      assertRendersFlag('abstract');
    });
  });

  describe('Const', () => {
    beforeEach(() => {
      flags.isConst = true;
    });

    it('should render the flag.', () => {
      assertRendersFlag('const');
    });
  });

  describe('Static', () => {
    beforeEach(() => {
      flags.isStatic = true;
    });

    it('should render the flag.', () => {
      assertRendersFlag('static');
    });
  });

  describe('Readonly', () => {
    beforeEach(() => {
      flags.isReadonly = true;
    });

    it('should render the flag.', () => {
      assertRendersFlag('readonly');
    });
  });

  describe('Protected', () => {
    beforeEach(() => {
      flags.isProtected = true;
    });

    it('should render the flag.', () => {
      assertRendersFlag('protected');
    });
  });

  describe('Private', () => {
    beforeEach(() => {
      flags.isPrivate = true;
    });

    it('should render the flag.', () => {
      assertRendersFlag('private');
    });
  });

  describe('Rest', () => {
    beforeEach(() => {
      flags.isRest = true;
    });

    it('should render the flag.', () => {
      assertRendersFlag('rest');
    });
  });

  describe('Optional', () => {
    beforeEach(() => {
      flags.isOptional = true;
    });

    it('should render the flag.', () => {
      assertRendersFlag('optional');
    });
  });
});
