import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { ZAlertBuilder, ZAlertSeverity } from '@zthun/works.message';
import {
  useAlertService,
  useSafeState,
  ZBooleanSwitch,
  ZButton,
  ZCard,
  ZGridLayout,
  ZH3,
  ZPaddedBox,
  ZParagraph,
  ZSeverityColor
} from '@zthun/works.react';
import { startCase } from 'lodash';

import React from 'react';

/**
 * Represents a demo for alerts.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZAlertsPage() {
  const [header, setHeader] = useSafeState(false);
  const [immortal, setImmortal] = useSafeState(false);
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
      heading='Alerts'
      subHeading='User feedback'
      avatar={<WarningIcon color='warning' fontSize='inherit' />}
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

        <ZGridLayout columns='25rem' gap={ZSizeFixed.Small}>
          <ZButton
            avatar={<CheckCircleIcon color='inherit' fontSize='small' />}
            color={ZSeverityColor.Success}
            outline
            onClick={openAlert.bind(null, ZAlertSeverity.Success, 'Something was a huge success.  Time to celebrate!')}
            label='Success'
          />
          <ZButton
            avatar={<WarningIcon color='inherit' fontSize='small' />}
            color={ZSeverityColor.Warning}
            outline
            onClick={openAlert.bind(null, ZAlertSeverity.Warning, 'You can continue, but something is amiss!')}
            label='Warning'
          />
          <ZButton
            avatar={<ErrorIcon color='inherit' fontSize='small' />}
            color={ZSeverityColor.Error}
            outline
            onClick={openAlert.bind(null, ZAlertSeverity.Error, 'Uh oh!  Something has gone wrong!')}
            label='Error'
          />
          <ZButton
            avatar={<InfoIcon color='inherit' fontSize='small' />}
            color={ZSeverityColor.Info}
            outline
            onClick={openAlert.bind(null, ZAlertSeverity.Info, 'Just some basic information.')}
            label='Info'
          />
        </ZGridLayout>
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Small}>
          <ZBooleanSwitch value={immortal} onValueChange={setImmortal} label='Immortal' />
          <ZBooleanSwitch value={header} onValueChange={setHeader} label='Header' />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
