import { Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import EmojiFoodBeverageTwoToneIcon from '@material-ui/icons/EmojiFoodBeverageTwoTone';
import { ZHttpCodeClientDescriptions, ZHttpCodeClientNames } from '@zthun/works.core';
import React from 'react';
import { ZPaperCard } from '../common/paper-card';
import { IZHttpErrorCodeCardProps } from './http-code-card.props';

/**
 * Renders a paper card that describes an HttpStatusCode.
 *
 * @param props The properties for the component.
 *
 * @returns The jsx that renders the card.
 */
export function ZHttpStatusCodeCard(props: IZHttpErrorCodeCardProps) {
  const name = ZHttpCodeClientNames[props.code];
  const heading = 'Client Error';
  const description = ZHttpCodeClientDescriptions[props.code];
  let avatar = <WarningIcon className='ZHttpStatusCodeCard-icon ZHttpStatusCodeCard-client' data-testid='ZHttpStatusCodeCard-client' />;

  if (props.code === 418) {
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
