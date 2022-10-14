/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { ZCircusActBuilder } from '@zthun/works.cirque';
import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import { sleep } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { IZAlert, IZAlertService, ZAlertBuilder, ZAlertSeverity } from '@zthun/works.message';
import React from 'react';
import { Subject } from 'rxjs';
import { v4 } from 'uuid';
import { ZAlertList } from './alert-list';
import { ZAlertListComponentModel } from './alert-list.cm';
import { ZAlertServiceContext } from './alert-service.context';

describe('ZAlertList', () => {
  const performer = new ZCircusPerformer();
  const waiter = new ZCircusWait();

  let events: Subject<IZAlert[]>;
  let success: IZAlert;
  let error: IZAlert;
  let info: IZAlert;
  let warning: IZAlert;
  let alerts: IZAlert[];
  let alertService: jest.Mocked<IZAlertService>;

  async function createTestTarget() {
    const element = (
      <ZAlertServiceContext.Provider value={alertService}>
        <ZAlertList />
      </ZAlertServiceContext.Provider>
    );

    const result = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => !!ZAlertListComponentModel.find(result.container).length);
    const [target] = ZAlertListComponentModel.find(result.container);
    return new ZAlertListComponentModel(target, performer);
  }

  beforeEach(() => {
    events = new Subject<IZAlert[]>();

    success = new ZAlertBuilder().success().message('Success Message').header('Yay!').id(v4()).build();
    error = new ZAlertBuilder().error().message('Error Message').id(v4()).build();
    info = new ZAlertBuilder().info().message('Info Message').id(v4()).build();
    warning = new ZAlertBuilder().warning().message('Warning Message').id(v4()).build();

    alerts = [success, error, info, warning];

    alertService = createMocked<IZAlertService>(['all', 'watch', 'remove']);
    alertService.all.mockResolvedValue([]);
    alertService.watch.mockReturnValue(events);
  });

  async function publishAlerts(alerts: IZAlert[]) {
    const act = new ZCircusActBuilder()
      .magic(async () => {
        events.next(alerts);
        await sleep(1);
      })
      .build();
    await performer.perform(act);
  }

  describe('List', () => {
    it('should render an empty list of alerts when rendered first.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.alerts();
      // Assert
      expect(actual.length).toBeFalsy();
    });

    it('should render the alerts that come in from the service.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await publishAlerts([success, warning]);
      const alertSuccess = await target.alert(success);
      const alertWarning = await target.alert(warning);
      const actual = alertSuccess && alertWarning;
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should render the alerts from the alert service at the start.', async () => {
      // Arrange
      alertService.all.mockResolvedValue(alerts);
      const expected = alerts.map((a) => a._id);
      const target = await createTestTarget();
      // Act
      const renderedAlerts = await target.alerts();
      const actual = renderedAlerts.map((a) => a.id);
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Close', () => {
    it('should close the selected alert.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await publishAlerts([success, warning]);
      await target.close(success);
      // Assert
      expect(alertService.remove).toHaveBeenCalledWith(success._id);
    });

    it('should not close non existing alert.', async () => {
      // Arrange
      const target = await createTestTarget();
      const id = v4();
      // Act.
      const alert = await target.alert(id);
      await target.close(alert);
      // Assert.
      expect(alertService.remove).not.toHaveBeenCalled();
    });
  });

  describe('Header', () => {
    it('should render the correct header', async () => {
      // Arrange
      const target = await createTestTarget();
      await publishAlerts([success]);
      // Act.
      const alert = await target.alert(success);
      const actual = await alert.header();
      // Assert.
      expect(actual).toEqual(success.header);
    });

    it('should not render a header if it is not set', async () => {
      // Arrange
      const target = await createTestTarget();
      await publishAlerts([warning]);
      // Act.
      const alert = await target.alert(warning);
      const actual = await alert.header();
      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe('Message', () => {
    it('should render the correct message', async () => {
      // Arrange
      const target = await createTestTarget();
      await publishAlerts([success]);
      // Act.
      const alert = await target.alert(success);
      const actual = await alert.message();
      // Assert.
      expect(actual).toEqual(success.message);
    });

    it('should not render messages for timed out alerts', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const alert = await target.alert(v4());
      const actual = await alert.message();
      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe('Severity', () => {
    async function assertRendersMessageSeverity(expected: ZAlertSeverity, alert: IZAlert) {
      // Arrange.
      const target = await createTestTarget();
      await publishAlerts([alert]);
      // Act.
      const _alert = await target.alert(alert);
      const actual = await _alert.severity();
      // Assert.
      expect(actual).toEqual(expected);
    }

    it('should render a success message', async () => {
      await assertRendersMessageSeverity(ZAlertSeverity.Success, success);
    });

    it('should render a warning message', async () => {
      await assertRendersMessageSeverity(ZAlertSeverity.Warning, warning);
    });

    it('should render an error message', async () => {
      await assertRendersMessageSeverity(ZAlertSeverity.Error, error);
    });

    it('should render an info message', async () => {
      await assertRendersMessageSeverity(ZAlertSeverity.Info, info);
    });

    it('should not render anything for a dead alert', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const _alert = await target.alert(v4());
      const actual = await _alert.severity();
      // Assert.
      expect(actual).toBeNull();
    });
  });
});
