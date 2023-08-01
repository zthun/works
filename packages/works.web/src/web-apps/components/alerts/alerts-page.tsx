import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZAlertBuilder, ZAlertSeverity } from '@zthun/works.message';
import {
  ZBooleanSwitch,
  ZButton,
  ZCard,
  ZGridLayout,
  ZH3,
  ZPaddedBox,
  ZParagraph,
  useAlertService,
  useFashionDesign
} from '@zthun/works.react';
import { startCase } from 'lodash';
import React, { useState } from 'react';
import { ZRouteAlerts } from '../../../routes';

/**
 * Represents a demo for alerts.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZAlertsPage() {
  const [header, setHeader] = useState(false);
  const { success, warning, error, info } = useFashionDesign();
  const [immortal, setImmortal] = useState(false);
  const service = useAlertService();

  /**
   * Opens a specific alert.
   *
   * @param color
   *        The color of the alert to open.
   * @param message
   *        The message of the alert.
   */
  async function openAlert(color: ZAlertSeverity, message: string): Promise<void> {
    let alert = new ZAlertBuilder().severity(color).message(message);

    if (immortal) {
      alert = alert.immortal();
    }

    if (header) {
      alert = alert.header(startCase(color));
    }

    await service.create(alert.build());
  }

  return (
    <ZCard
      className='ZAlertsPage-root'
      heading={ZRouteAlerts.name}
      subHeading={ZRouteAlerts.description}
      avatar={ZRouteAlerts.avatar}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Alerts allow you to give quick feedback to users after performing actions. Zthunworks alerts use a toaster
          style to keep notifications out of the way and easy to manager and see. All alerts, by default, have a time
          limit, at which point, they will expire and be removed. Alerts are normally kept at the root and a web app
          will contain a single alert list. This allows all alerts to be displayed in a uniform fashion.
        </ZParagraph>

        <ZParagraph>
          It is also possible to construct perpetual alerts that never leave the alert list. This is useful if you want
          to have specific errors or messages left around for the user to interact with. Some users read at different
          speeds and if messages are too quick to flash on the screen, then its easy to miss when things go wrong. If
          alerts are immortal, then it will be up to the user to close the alert when they are finished with them.
        </ZParagraph>

        <ZGridLayout columns='15rem' gap={ZSizeFixed.Small}>
          <ZButton
            avatar={<CheckCircleIcon color='inherit' fontSize='small' />}
            fashion={success}
            outline
            onClick={openAlert.bind(null, ZAlertSeverity.Success, 'Something was a huge success.  Time to celebrate!')}
            name='alert-success'
            label='Success'
          />
          <ZButton
            avatar={<WarningIcon color='inherit' fontSize='small' />}
            fashion={warning}
            outline
            onClick={openAlert.bind(null, ZAlertSeverity.Warning, 'You can continue, but something is amiss!')}
            name='alert-warning'
            label='Warning'
          />
          <ZButton
            avatar={<ErrorIcon color='inherit' fontSize='small' />}
            fashion={error}
            outline
            onClick={openAlert.bind(null, ZAlertSeverity.Error, 'Uh oh!  Something has gone wrong!')}
            name='alert-error'
            label='Error'
          />
          <ZButton
            avatar={<InfoIcon color='inherit' fontSize='small' />}
            fashion={info}
            outline
            onClick={openAlert.bind(null, ZAlertSeverity.Info, 'Just some basic information.')}
            name='alert-info'
            label='Info'
          />
        </ZGridLayout>
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Small}>
          <ZBooleanSwitch value={immortal} onValueChange={setImmortal} label='Immortal' name='option-immortal' />
          <ZBooleanSwitch value={header} onValueChange={setHeader} label='Header' name='option-header' />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
