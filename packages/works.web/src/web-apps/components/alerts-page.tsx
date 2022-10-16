import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { ZAlertBuilder, ZAlertSeverity } from '@zthun/works.message';
import {
  useAlertService,
  useSafeState,
  ZBooleanSwitch,
  ZButton,
  ZGridLayout,
  ZPaperCard,
  ZStateColor
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
    <ZPaperCard
      className='ZAlertsPage-root'
      headerText='Alerts'
      subHeaderText='User feedback'
      avatar={<WarningIcon color='warning' fontSize='inherit' />}
    >
      <h3>Description</h3>

      <p>
        Alerts allow you to give quick feedback to users after performing actions. Zthunworks alerts use a toaster style
        to keep notifications out of the way and easy to manager and see. All alerts, by default, have a time limit, at
        which point, they will expire and be removed. Alerts are normally kept at the root and a web app will contain a
        single alert list. This allows all alerts to be displayed in a uniform fashion.
      </p>

      <p>Alerts are broken up by 4 levels of severity.</p>

      <ol>
        <li>Success: Something was successful and you want to notify the user of said success.</li>
        <li>Warning: Something may have gone wrong, but it will not stop the user from continuing.</li>
        <li>Error: Something bad happened. The user cannot perform the operation they were attempting to perform.</li>
        <li>Info: Informational messages which help to educate the user on different topics.</li>
      </ol>

      <p>
        It is also possible to construct perpetual alerts that never leave the alert list. This is useful if you want to
        have specific errors or messages left around for the user to interact with. Some users read at different speeds
        and if messages are too quick to flash on the screen, then its easy to miss when things go wrong. If alerts are
        immortal, then it will be up to the user to close the alert when they are finished with them.
      </p>

      <h3>Demo</h3>
      <ZGridLayout columns='auto auto' gap='md'>
        <ZButton
          avatar={<CheckCircleIcon fontSize='small' />}
          color={ZStateColor.Success}
          outline
          onClick={openAlert.bind(null, ZAlertSeverity.Success, 'Something was a huge success.  Time to celebrate!')}
          label='Success'
        />
        <ZButton
          avatar={<WarningIcon fontSize='small' />}
          color={ZStateColor.Warning}
          outline
          onClick={openAlert.bind(null, ZAlertSeverity.Warning, 'You can continue, but something is amiss!')}
          label='Warning'
        />
        <ZButton
          avatar={<ErrorIcon fontSize='small' />}
          color={ZStateColor.Error}
          outline
          onClick={openAlert.bind(null, ZAlertSeverity.Error, 'Uh oh!  Something has gone wrong!')}
          label='Error'
        />
        <ZButton
          avatar={<InfoIcon fontSize='small' />}
          color={ZStateColor.Info}
          outline
          onClick={openAlert.bind(null, ZAlertSeverity.Info, 'Just some basic information.')}
          label='Info'
        />
      </ZGridLayout>

      <h3>Options</h3>
      <ZGridLayout gap='sm'>
        <ZBooleanSwitch value={immortal} onValueChange={setImmortal} label='Immortal' />
        <ZBooleanSwitch value={header} onValueChange={setHeader} label='Header' />
      </ZGridLayout>
    </ZPaperCard>
  );
}
