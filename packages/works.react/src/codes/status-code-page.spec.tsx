/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { renderStatusCodePage, ZStatusCodePage } from './status-code-page';

describe('ZStatusCodePage', () => {
  let code: number;

  function createTestTarget() {
    return render(<ZStatusCodePage code={code} />);
  }

  beforeEach(() => {
    code = 404;
  });

  it('should render the page.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZStatusCodePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should render the status code page with support for a route param.', async () => {
    // Arrange
    const props = { match: { params: { code }, isExact: true, path: 'status-code/:code', url: null } } as RouteComponentProps<any>;
    const target = render(renderStatusCodePage('code', props));
    // Act
    const actual = target.container.querySelector(`.ZHttpStatusCodeCard-code-${code}`);
    // Assert
    expect(actual).toBeTruthy();
  });
});
