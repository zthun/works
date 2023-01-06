/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZAlertSeverity } from '@zthun/works.message';
import { ZAlertList, ZButtonComponentModel } from '@zthun/works.react';
import { startCase } from 'lodash';
import React from 'react';
import { ZAlertsPage } from './alerts-page';
import { ZAlertsPageComponentModel } from './alerts-page.cm';

describe('ZAlertsPage', () => {
  async function createTestTarget() {
    const element = (
      <>
        <ZAlertList />
        <ZAlertsPage />
      </>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZAlertsPageComponentModel);
  }

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
      const [alert] = await (await target.alerts()).alerts();
      const actual = await alert.severity();
      // Assert.
      expect(actual).toEqual(expected);
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
      const [alert] = await (await target.alerts()).alerts();
      const header = await alert.header();
      const severity = await alert.severity();
      // Assert.
      expect(header).toEqual(startCase(expected));
      expect(severity).toEqual(expected);
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
      const [alert] = await (await target.alerts()).alerts();
      const timeout = await alert.timeout();
      const severity = await alert.severity();
      // Assert.
      expect(timeout).toEqual(Infinity);
      expect(severity).toEqual(expected);
    }

    it('should add a timeout to the success alert', async () => {
      await shouldLiveForever(ZAlertSeverity.Success, (t) => t.success());
    });

    it('should add a timeout to the error alert', async () => {
      await shouldLiveForever(ZAlertSeverity.Error, (t) => t.error());
    });

    it('should add a timeout to the warning alert', async () => {
      await shouldLiveForever(ZAlertSeverity.Warning, (t) => t.warning());
    });

    it('should add a timeout to the info alert', async () => {
      await shouldLiveForever(ZAlertSeverity.Info, (t) => t.info());
    });
  });
});
