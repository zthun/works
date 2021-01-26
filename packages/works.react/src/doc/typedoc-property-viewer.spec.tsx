/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZTypedocEntity, ZTypedocKind, ZTypedocTypeKind } from '@zthun/works.core';
import React from 'react';
import { ZTypedocPropertyViewer } from './typedoc-property-viewer';

describe('ZTypedocEntityViewer', () => {
  let property: IZTypedocEntity;

  function createTestTarget() {
    return render(<ZTypedocPropertyViewer property={property} />);
  }

  beforeEach(() => {
    property = {
      id: 2,
      name: 'email',
      kind: ZTypedocKind.Property,
      comment: {
        shortText: 'The login email.'
      },
      type: {
        type: ZTypedocTypeKind.Intrinsic,
        name: 'string'
      },
      defaultValue: '"test@zthunworks.com"'
    };
  });

  it('renders the signature.', () => {
    // Arrange
    const target = createTestTarget();
    const expected = 'email: string = "test@zthunworks.com"';
    // Act
    const root = target.getByTestId('ZTypedocPropertyViewer-root');
    const text = root.textContent;
    const actual = text.indexOf(expected) >= 0;
    // Assert
    expect(actual).toBeTruthy();
  });

  it('does not render any default value if none is set.', () => {
    // Arrange
    delete property.defaultValue;
    const target = createTestTarget();
    const expected = 'email: string';
    // Act
    const root = target.getByTestId('ZTypedocPropertyViewer-root');
    const text = root.textContent;
    const actual = text.indexOf(expected) >= 0;
    // Assert
    expect(actual).toBeTruthy();
  });

  it('renders the comment', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const root = target.getByTestId('ZTypedocPropertyViewer-root');
    const text = root.textContent;
    const actual = text.indexOf(property.comment.shortText) >= 0;
    // Assert
    expect(actual).toBeTruthy();
  });
});
