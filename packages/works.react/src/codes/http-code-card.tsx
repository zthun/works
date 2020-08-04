import { Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { ZHttpCodeClientDescriptions, ZHttpCodeClientNames } from '@zthun/works.core';
import React from 'react';
import { ZPaperCard } from '../common/paper-card';
import { IZHttpErrorCodeCardProps } from './http-code-card.props';

export function ZHttpCodeCard(props: IZHttpErrorCodeCardProps) {
  const name = ZHttpCodeClientNames[props.code];
  const heading = `${props.code}`;
  const description = ZHttpCodeClientDescriptions[props.code];
  const avatar = <WarningIcon />;

  return (
    <ZPaperCard className='ZHttpCodeCard-root' data-testid='ZHttpCodeCard-root' avatar={avatar} headerText={heading} subHeaderText={name}>
      <Typography>{description}</Typography>
    </ZPaperCard>
  );
}
