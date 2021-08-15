import { Typography } from '@material-ui/core';
import EmojiFoodBeverageTwoToneIcon from '@material-ui/icons/EmojiFoodBeverageTwoTone';
import WarningIcon from '@material-ui/icons/Warning';
import { getHttpCodeDescription, getHttpCodeName, ZHttpCodeClient } from '@zthun/works.http';
import React from 'react';
import { ZPaperCard } from '../card/paper-card';
import { IZHttpErrorCodeCardProps } from './http-code-card.props';

/**
 * Renders a paper card that describes an HttpStatusCode.
 *
 * @param props The properties for the component.
 *
 * @returns The jsx that renders the card.
 */
export function ZHttpStatusCodeCard(props: IZHttpErrorCodeCardProps) {
  const name = getHttpCodeName(props.code);
  const heading = 'Error';
  const description = getHttpCodeDescription(props.code);
  let avatar = <WarningIcon className='ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-client' data-testid='ZHttpStatusCodeCard-client' />;

  if (props.code === ZHttpCodeClient.ImATeapot) {
    avatar = <EmojiFoodBeverageTwoToneIcon className='ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-teapot' data-testid='ZHttpStatusCodeCard-teapot' />;
  }

  return (
    <ZPaperCard className='ZHttpStatusCodeCard-root' data-testid='ZHttpStatusCodeCard-root' avatar={avatar} headerText={heading} subHeaderText={name}>
      <Typography variant='body1' component='p' className='ZHttpStatusCodeCard-description'>
        {description}
      </Typography>
      <Typography variant='body2' component='div' className='ZHttpStatusCodeCard-code'>
        {props.code}
      </Typography>
    </ZPaperCard>
  );
}
