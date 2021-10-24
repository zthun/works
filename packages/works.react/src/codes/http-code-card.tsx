import { Typography } from '@mui/material';
import EmojiFoodBeverageTwoToneIcon from '@mui/icons-material/EmojiFoodBeverageTwoTone';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ForwardIcon from '@mui/icons-material/Forward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { getHttpCodeCategory, getHttpCodeDescription, getHttpCodeName, getHttpCodeSeverity, ZHttpCode, ZHttpCodeClient, ZHttpCodeSeverity } from '@zthun/works.http';
import React from 'react';
import { ZPaperCard } from '../card/paper-card';
import { makeStyles } from '../theme/make-styles';

/**
 * Represents a status summary card for an http error code.
 */
export interface IZHttpStatusCodeCardProps {
  /**
   * One of the available http codes.
   */
  code: ZHttpCode;
}

const useHttpStatusCodeCardStyles = makeStyles<IZHttpStatusCodeCardProps>()((theme, props) => {
  const { code } = props;

  const colors = {
    [ZHttpCodeSeverity.Error]: theme.palette.error.main,
    [ZHttpCodeSeverity.Warning]: theme.palette.warning.main,
    [ZHttpCodeSeverity.Info]: theme.palette.info.main,
    [ZHttpCodeSeverity.Success]: theme.palette.success.main
  };

  const severity = getHttpCodeSeverity(code);

  return {
    description: {
      fontSize: theme.sizing.font.lg,
      maxWidth: '30rem'
    },
    code: {
      fontSize: '6rem',
      color: theme.palette.secondary.main,
      opacity: '0.75',
      textAlign: 'center'
    },
    icon: {
      fontSize: '4rem',
      color: colors[severity]
    }
  };
});

/**
 * Renders a paper card that describes an HttpStatusCode.
 *
 * @param props The properties for the component.
 *
 * @returns The jsx that renders the card.
 */
export function ZHttpStatusCodeCard(props: IZHttpStatusCodeCardProps) {
  const { code } = props;
  const name = getHttpCodeName(code);
  const heading = getHttpCodeCategory(code);
  const description = getHttpCodeDescription(code);
  const styles = useHttpStatusCodeCardStyles(props);

  /**
   * Renders the avatar based on the category of the code being presented.
   *
   * @returns The avatar of the code being presented.
   */
  function renderAvatar() {
    if (code === ZHttpCodeClient.ImATeapot) {
      return <EmojiFoodBeverageTwoToneIcon className={`ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-teapot ${styles.classes.icon}`} data-testid='ZHttpStatusCodeCard-teapot' />;
    }

    if (code >= 100 && code < 200) {
      return <InfoIcon className={`ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-info ${styles.classes.icon}`} data-testid='ZHttpStatusCodeCard-info' />;
    }

    if (code >= 200 && code < 300) {
      return <CheckCircleIcon className={`ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-success ${styles.classes.icon}`} data-testid='ZHttpStatusCodeCard-success' />;
    }

    if (code >= 300 && code < 400) {
      return <ForwardIcon className={`ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-redirect ${styles.classes.icon}`} data-testid='ZHttpStatusCodeCard-redirect' />;
    }

    if (code >= 400 && code < 500) {
      return <WarningIcon className={`ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-client ${styles.classes.icon}`} data-testid='ZHttpStatusCodeCard-client' />;
    }

    return <ErrorIcon className={`ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-server ${styles.classes.icon}`} data-testid='ZHttpStatusCodeCard-server' />;
  }

  /*
  let avatar = <WarningIcon className={`ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-client ${styles.classes.icon}`} data-testid='ZHttpStatusCodeCard-client' />;

  if (props.code === ZHttpCodeClient.ImATeapot) {
    avatar = <EmojiFoodBeverageTwoToneIcon className={`ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-teapot ${styles.classes.icon}`} data-testid='ZHttpStatusCodeCard-teapot' />;
  }
  */

  return (
    <ZPaperCard className='ZHttpStatusCodeCard-root' data-testid='ZHttpStatusCodeCard-root' avatar={renderAvatar()} headerText={heading} subHeaderText={name}>
      <Typography variant='body1' component='p' className={`ZHttpStatusCodeCard-description ${styles.classes.description}`}>
        {description}
      </Typography>
      <Typography variant='body2' component='div' className={`ZHttpStatusCodeCard-code ZHttpStatusCodeCard-code-${code} ${styles.classes.code}`}>
        {props.code}
      </Typography>
    </ZPaperCard>
  );
}
