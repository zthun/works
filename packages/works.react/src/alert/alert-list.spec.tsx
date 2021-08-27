/* eslint-disable require-jsdoc */
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import { createMocked } from '@zthun/works.jest';
import { IZAlert, IZAlertService, ZAlertBuilder } from '@zthun/works.message';
import { first } from 'lodash';
import React from 'react';
import { delay, lastValueFrom, of, Subject } from 'rxjs';
import { v4 } from 'uuid';
import { ZAlertList } from './alert-list';
import { ZAlertServiceContext } from './alert-service.context';

describe('ZAlertList', () => {
  let events: Subject<IZAlert[]>;
  let success: IZAlert;
  let error: IZAlert;
  let info: IZAlert;
  let warning: IZAlert;
  let alerts: IZAlert[];
  let alertService: jest.Mocked<IZAlertService>;

  async function createTestTarget() {
    let target: RenderResult;

    await act(async () => {
      target = render(
        <ZAlertServiceContext.Provider value={alertService}>
          <ZAlertList />
        </ZAlertServiceContext.Provider>
      );

      await lastValueFrom(of(true).pipe(delay(0)));
    });

    return target;
  }

  beforeEach(() => {
    events = new Subject<IZAlert[]>();

    success = new ZAlertBuilder().success().message('Success Message').id(v4()).build();
    error = new ZAlertBuilder().error().message('Error Message').id(v4()).build();
    info = new ZAlertBuilder().info().message('Info Message').id(v4()).build();
    warning = new ZAlertBuilder().warning().message('Warning Message').id(v4()).build();

    alerts = [success, error, info, warning];

    alertService = createMocked<IZAlertService>(['all', 'watch', 'remove']);
    alertService.all.mockResolvedValue([]);
    alertService.watch.mockReturnValue(events);
  });

  async function getAlerts(target: RenderResult) {
    const alerts = target.container.querySelectorAll('.ZAlertList-alert');
    return Promise.resolve(alerts);
  }

  async function getAlert(id: string, target: RenderResult) {
    const alert = target.container.querySelector(`.ZAlertList-alert-${id}`);
    return Promise.resolve(alert);
  }

  async function publishAlerts(alerts: IZAlert[]) {
    await act(async () => {
      events.next(alerts);
      await lastValueFrom(of(true).pipe(delay(0)));
    });
  }

  async function removeAlert(id: string, target: RenderResult) {
    const alert = await getAlert(id, target);
    const x = first(alert.getElementsByTagName('button'));
    await act(async () => {
      fireEvent.click(x);
      await lastValueFrom(of(true).pipe(delay(0)));
    });
  }

  it('should render an empty list of alerts when rendered first.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = await getAlerts(target);
    // Assert
    expect(actual.length).toBeFalsy();
  });

  it('should render the alerts that come in from the service.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    await publishAlerts([success, warning]);
    const alertSuccess = await getAlert(success._id, target);
    const alertWarning = await getAlert(warning._id, target);
    const actual = alertSuccess && alertWarning;
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should render the alerts from the alert service at the start.', async () => {
    // Arrange
    alertService.all.mockResolvedValue(alerts);
    const target = await createTestTarget();
    // Act
    const alertSuccess = await getAlert(success._id, target);
    const alertError = await getAlert(error._id, target);
    const alertWarning = await getAlert(warning._id, target);
    const alertInfo = await getAlert(info._id, target);
    const actual = alertSuccess && alertError && alertWarning && alertInfo;
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should close the selected alert.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    await publishAlerts([success, warning]);
    await removeAlert(success._id, target);
    // Assert
    expect(alertService.remove).toHaveBeenCalledWith(success._id);
  });
});
