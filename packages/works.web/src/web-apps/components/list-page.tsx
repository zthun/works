// cspell:disable
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { ZAlertBuilder, ZAlertSeverity } from '@zthun/works.message';
import { useAlertService, ZH3, ZList, ZListLineItem, ZPaperCard, ZParagraph } from '@zthun/works.react';
import React from 'react';

/**
 * Represents a demo for lists.
 *
 * @returns
 *    The JSX to render the list demo page.
 */
export function ZListPage() {
  const successHeader = 'Success';
  const successMessage = 'Everything is OK';
  const warningHeader = 'Warning';
  const warningMessage = 'Here be dragons';
  const errorHeader = 'Error';
  const errorMessage = 'Things have gone wrong';
  const infoHeader = 'Info';
  const infoMessage = 'Time for some education';
  const alerts = useAlertService();

  const showAlert = async (header: string, msg: string, severity: ZAlertSeverity) => {
    const alert = new ZAlertBuilder().header(header).message(msg).severity(severity).build();
    await alerts.create(alert);
  };

  return (
    <ZPaperCard
      className='ZListPage-root'
      headerText='List'
      subHeaderText='Showing multiple items'
      avatar={<FormatListNumberedIcon color='info' fontSize='inherit' />}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>Lists help with displaying arrays and collections of data.</ZParagraph>

      <ZH3>Line Items</ZH3>

      <ZList>
        <ZListLineItem
          avatar={<CheckCircleIcon color='success' />}
          heading={successHeader}
          subHeading={successMessage}
          onClick={showAlert.bind(null, successHeader, successMessage, ZAlertSeverity.Success)}
        />
        <ZListLineItem
          avatar={<WarningIcon color='warning' />}
          heading={warningHeader}
          subHeading={warningMessage}
          onClick={showAlert.bind(null, warningHeader, warningMessage, ZAlertSeverity.Warning)}
        />
        <ZListLineItem
          avatar={<ErrorIcon color='error' />}
          heading={errorHeader}
          subHeading={errorMessage}
          onClick={showAlert.bind(null, errorHeader, errorMessage, ZAlertSeverity.Error)}
        />
        <ZListLineItem
          avatar={<InfoIcon color='info' />}
          heading={infoHeader}
          subHeading={infoMessage}
          onClick={showAlert.bind(null, infoHeader, infoMessage, ZAlertSeverity.Info)}
        />
      </ZList>
    </ZPaperCard>
  );
}
