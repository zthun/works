import { Typography } from '@mui/material';
import EmojiFoodBeverageTwoToneIcon from '@mui/icons-material/EmojiFoodBeverageTwoTone';
import WarningIcon from '@mui/icons-material/Warning';
import { getHttpCodeDescription, getHttpCodeName, ZHttpCode, ZHttpCodeClient } from '@zthun/works.http';
import React from 'react';
import { ZPaperCard } from '../card/paper-card';

/**
 * Represents a status summary card for an http error code.
 */
export interface IZHttpStatusCodeCardProps {
  /**
   * One of the available http codes.
   */
  code: ZHttpCode;
}

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
  const heading = 'Error';
  const description = getHttpCodeDescription(code);
  let avatar = <WarningIcon className='ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-client' data-testid='ZHttpStatusCodeCard-client' />;

  if (props.code === ZHttpCodeClient.ImATeapot) {
    avatar = <EmojiFoodBeverageTwoToneIcon className='ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-teapot' data-testid='ZHttpStatusCodeCard-teapot' />;
  }

  return (
    <ZPaperCard className='ZHttpStatusCodeCard-root' data-testid='ZHttpStatusCodeCard-root' avatar={avatar} headerText={heading} subHeaderText={name}>
      <Typography variant='body1' component='p' className='ZHttpStatusCodeCard-description'>
        {description}
      </Typography>
      <Typography variant='body2' component='div' className={`ZHttpStatusCodeCard-code ZHttpStatusCodeCard-code-${code}`}>
        {props.code}
      </Typography>
    </ZPaperCard>
  );
}
