import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { createMocked } from '@zthun/works.jest';
import { IZAlert, IZAlertService, ZAlertSeverity } from '@zthun/works.message';
import { ZAlertServiceContext, ZButtonComponentModel } from '@zthun/works.react';
import { startCase } from 'lodash';
import React from 'react';
import { ZAlertsPage } from './alerts-page';
import { ZAlertsPageComponentModel } from './alerts-page.cm';

/* eslint-disable require-jsdoc */
describe('ZAlertsPage', () => {
  let alerts: jest.Mocked<IZAlertService>;

  async function createTestTarget() {
    const element = (
      <ZAlertServiceContext.Provider value={alerts}>
        <ZAlertsPage />
      </ZAlertServiceContext.Provider>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZAlertsPageComponentModel, ZAlertsPageComponentModel.Selector);
  }

  beforeEach(() => {
    alerts = createMocked(['create']);
  });

  describe('Alert Severity', () => {
    async function shouldInvokeAlert(
      expected: ZAlertSeverity,
      create: (t: ZAlertsPageComponentModel) => Promise<ZButtonComponentModel>
    ) {
      // Arrange.
      const target = await createTestTarget();
      const button = await create(target);
      // Act.
      await button.click();
      // Assert.
      expect(alerts.create).toHaveBeenCalledWith(expect.objectContaining<Partial<IZAlert>>({ severity: expected }));
    }

    it('should invoke a success alert', async () => {
      await shouldInvokeAlert(ZAlertSeverity.Success, (t) => t.success());
    });

    it('should invoke a warning alert', async () => {
      await shouldInvokeAlert(ZAlertSeverity.Warning, (t) => t.warning());
    });

    it('should invoke an error alert', async () => {
      await shouldInvokeAlert(ZAlertSeverity.Error, (t) => t.error());
    });

    it('should invoke an info alert', async () => {
      await shouldInvokeAlert(ZAlertSeverity.Info, (t) => t.info());
    });
  });

  describe('Alert Headers', () => {
    async function shouldAddHeader(
      expected: ZAlertSeverity,
      create: (t: ZAlertsPageComponentModel) => Promise<ZButtonComponentModel>
    ) {
      // Arrange.
      const target = await createTestTarget();
      await (await target.header()).toggle(true);
      const button = await create(target);
      // Act.
      await button.click();
      // Assert.
      expect(alerts.create).toHaveBeenCalledWith(
        expect.objectContaining<Partial<IZAlert>>({
          header: expect.stringContaining(startCase(expected)),
          severity: expected
        })
      );
    }

    it('should add a header to the success alert', async () => {
      await shouldAddHeader(ZAlertSeverity.Success, (t) => t.success());
    });

    it('should add a header to the error alert', async () => {
      await shouldAddHeader(ZAlertSeverity.Error, (t) => t.error());
    });

    it('should add a header to the warning alert', async () => {
      await shouldAddHeader(ZAlertSeverity.Warning, (t) => t.warning());
    });

    it('should add a header to the info alert', async () => {
      await shouldAddHeader(ZAlertSeverity.Info, (t) => t.info());
    });
  });

  describe('Alert Lifespan', () => {
    async function shouldLiveForever(
      expected: ZAlertSeverity,
      create: (t: ZAlertsPageComponentModel) => Promise<ZButtonComponentModel>
    ) {
      // Arrange.
      const target = await createTestTarget();
      await (await target.immortal()).toggle(true);
      const button = await create(target);
      // Act.
      await button.click();
      // Assert.
      expect(alerts.create).toHaveBeenCalledWith(
        expect.objectContaining<Partial<IZAlert>>({ timeToLive: Infinity, severity: expected })
      );
    }

    it('should add a header to the success alert', async () => {
      await shouldLiveForever(ZAlertSeverity.Success, (t) => t.success());
    });

    it('should add a header to the error alert', async () => {
      await shouldLiveForever(ZAlertSeverity.Error, (t) => t.error());
    });

    it('should add a header to the warning alert', async () => {
      await shouldLiveForever(ZAlertSeverity.Warning, (t) => t.warning());
    });

    it('should add a header to the info alert', async () => {
      await shouldLiveForever(ZAlertSeverity.Info, (t) => t.info());
    });
  });
});
