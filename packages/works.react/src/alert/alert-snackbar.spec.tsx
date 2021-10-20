/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { createMocked } from '@zthun/works.jest';
import { IZAlert, IZAlertService, ZAlertBuilder } from '@zthun/works.message';
import React from 'react';
import { lastValueFrom, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ZAlertServiceContext } from './alert-service.context';
import { ZAlertSnackbar } from './alert-snackbar';

describe('ZAlertSnackbar', () => {
  let alertService: jest.Mocked<IZAlertService>;
  let alerts: IZAlert[];

  async function createTestTarget() {
    const target = render(
      <ZAlertServiceContext.Provider value={alertService}>
        <ZAlertSnackbar></ZAlertSnackbar>
      </ZAlertServiceContext.Provider>
    );

    await waitFor(async () => {
      const query = '.ZAlertSnackbar-root';
      const root = target.container.querySelector(query);
      expect(root).not.toBeNull();
      await lastValueFrom(of(true).pipe(delay(0)));
    });

    return target;
  }

  beforeEach(() => {
    alerts = [new ZAlertBuilder().success().message('success').build(), new ZAlertBuilder().error().message('error').build()];

    alertService = createMocked<IZAlertService>(['all', 'watch']);
    alertService.all.mockResolvedValue(alerts);
    alertService.watch.mockReturnValue(new Subject<any>());
  });

  it('should render the alerts.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelectorAll('.ZAlertSnackbar-root .ZAlertList-alert');
    // Assert
    expect(actual.length).toEqual(alerts.length);
  });
});
