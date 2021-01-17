/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { ZTypedocKind } from '@zthun/works.core';
import React from 'react';
import { ZTypedocIcon } from './typedoc-icon';

describe('ZTypedocIcon', () => {
  function createTestTarget(kind: ZTypedocKind) {
    return render(<ZTypedocIcon kind={kind} />);
  }

  function assertIconForType(expected: string, kind: ZTypedocKind) {
    // Arrange
    const target = createTestTarget(kind);
    // Act
    const actual = target.getByTestId(expected);
    // Assert
    expect(actual).toBeTruthy();
  }

  it('should return a bullet icon by default.', () => {
    assertIconForType('ZTypedocIcon-bullet', ZTypedocKind.ExternalModule);
  });

  it('should return an enum icon for an enumeration.', () => {
    assertIconForType('ZTypedocIcon-enum', ZTypedocKind.Enum);
  });

  it('should return a class icon for a class.', () => {
    assertIconForType('ZTypedocIcon-class', ZTypedocKind.Class);
  });

  it('should return an interface icon for an interface.', () => {
    assertIconForType('ZTypedocIcon-interface', ZTypedocKind.Interface);
  });

  it('should return a type alias icon for a type alias.', () => {
    assertIconForType('ZTypedocIcon-type-alias', ZTypedocKind.TypeAlias);
  });

  it('should return an function icon for a function.', () => {
    assertIconForType('ZTypedocIcon-function', ZTypedocKind.Function);
  });

  it('should return a function icon for an method.', () => {
    assertIconForType('ZTypedocIcon-function', ZTypedocKind.Method);
  });

  it('should return a constructor icon for a constructor', () => {
    assertIconForType('ZTypedocIcon-constructor', ZTypedocKind.Constructor);
  });

  it('should return a property icon for a property', () => {
    assertIconForType('ZTypedocIcon-property', ZTypedocKind.Property);
  });

  it('should return a accessor icon for an accessor', () => {
    assertIconForType('ZTypedocIcon-accessor', ZTypedocKind.Accessor);
  });

  it('should return a variable icon for an variable', () => {
    assertIconForType('ZTypedocIcon-variable', ZTypedocKind.Variable);
  });

  it('should return a namespace icon for a namespace', () => {
    assertIconForType('ZTypedocIcon-namespace', ZTypedocKind.Namespace);
  });
});
