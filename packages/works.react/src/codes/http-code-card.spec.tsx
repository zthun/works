/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import { ZHttpCode, ZHttpCodeClient, ZHttpCodeInformationalResponse, ZHttpCodeRedirection, ZHttpCodeServer, ZHttpCodeSuccess } from '@zthun/works.http';
import React from 'react';
import { ZHttpStatusCodeCard } from './http-code-card';

describe('ZHttpStatusCodeCard', () => {
  let code: ZHttpCode;

  function createTestTarget() {
    return render(<ZHttpStatusCodeCard code={code} />);
  }

  beforeEach(() => {
    code = ZHttpCodeClient.NotFound;
  });

  describe('Icons', () => {
    function assertIcon(expected: string, c: ZHttpCode) {
      // Arrange
      code = c;
      const target = createTestTarget();
      // Act
      const icon = target.getByTestId(`ZHttpStatusCodeCard-${expected}`);
      // Assert
      expect(icon).toBeTruthy();
    }
    describe('Informational Response', () => {
      it('should render an info icon.', () => {
        assertIcon('info', ZHttpCodeInformationalResponse.Continue);
      });
    });

    describe('Success', () => {
      it('should render a success icon.', () => {
        assertIcon('success', ZHttpCodeSuccess.OK);
      });
    });

    describe('Redirection', () => {
      it('should render a redirect icon.', () => {
        assertIcon('redirect', ZHttpCodeRedirection.MultipleChoices);
      });
    });

    describe('Client', () => {
      it('should render a client icon.', () => {
        assertIcon('client', ZHttpCodeClient.BadRequest);
      });

      it('should render a teapot icon.', () => {
        assertIcon('teapot', ZHttpCodeClient.ImATeapot);
      });
    });

    describe('Server', () => {
      it('should render a server icon.', () => {
        assertIcon('server', ZHttpCodeServer.InternalServerError);
      });
    });
  });
});
