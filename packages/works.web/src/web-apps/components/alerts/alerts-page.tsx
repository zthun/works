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
      avatar={<WarningIcon color='warning' fontSize='large' />}
    >
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
          label='Error'
        />
      </ZGridLayout>

      <h2>Options</h2>
      <ZGridLayout gap='sm'>
        <ZBooleanSwitch value={immortal} onValueChange={setImmortal} label='Immortal' />
        <ZBooleanSwitch value={header} onValueChange={setHeader} label='Header' />
      </ZGridLayout>
    </ZPaperCard>
  );
}
