import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { ZAlertBuilder } from '@zthun/works.message';
import { ZButton, ZGridLayout, ZPaperCard, ZStateColor } from '@zthun/works.react';

import React from 'react';

/**
 * Represents a demo for alerts.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZAlertsPage() {
  /**
   * Opens a specific alert.
   *
   * @param color
   *        The color of the alert to open.
   */
  async function openAlert(color: ZStateColor): Promise<void> {
    const alert = new ZAlertBuilder().
  }

  return (
    <ZPaperCard
      className='ZButtonPage-root'
      headerText='Alerts'
      subHeaderText='User feedback'
      avatar={<WarningIcon color='warning' fontSize='large' />}
    >
      <ZGridLayout columns='auto auto' gap='md'>
        <ZButton
          avatar={<CheckCircleIcon fontSize='small' />}
          color={ZStateColor.Success}
          outline
          onClick={openAlert.bind(null, ZStateColor.Success)}
          label='Success'
        />
      </ZGridLayout>
    </ZPaperCard>
  );
}
