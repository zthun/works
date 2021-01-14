/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZTypedocType, ZTypedocTypeKind } from '@zthun/works.core';
import React from 'react';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

describe('ZTypedocTypeViewer', () => {
  let type: IZTypedocType;
  let header: string;
  let separator: string;
  let onReference: jest.Mock;

  function createTestTarget() {
    return render(<ZTypedocTypeViewer type={type} onReference={onReference} prefix={header} suffix={separator} />);
  }

  beforeEach(() => {
    type = {
      type: ZTypedocTypeKind.Intrinsic,
      name: 'string'
    };
    header = null;
    separator = null;
    onReference = jest.fn();
  });

  it('renders the component.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.findByTestId('ZTypedocTypeViewer-root');
    await of(true).pipe(delay(100)).toPromise();
    // Assert
    expect(actual).toBeTruthy();
  });
});
