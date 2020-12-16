/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { IZTypedoc } from '../../../works.core/dist/types';
import { ZTypedocViewer } from './typedoc-viewer';

describe('ZTypedocViewer', () => {
  let typedoc: IZTypedoc;
  let loading: boolean;

  function createTestTarget() {
    return render(<ZTypedocViewer typedoc={typedoc} loading={loading} />);
  }

  beforeEach(() => {
    loading = false;

    typedoc = {
      name: '@zthun/works.core',
      children: [],
      groups: []
    };
  });

  it('should render the component.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.findByTestId('ZTypedocViewer-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
