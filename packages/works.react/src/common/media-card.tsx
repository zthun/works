import { Button, Card, CardContent, CardHeader, CardMedia, Paper } from '@material-ui/core';
import { noop } from 'lodash';
import React from 'react';
import { IZMediaCardProps } from './media-card.props';

/**
 * Represents a card that displays a title, a media image, and an action button.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for the media card.
 */
export function ZMediaCard(props: IZMediaCardProps) {
  return (
    <Paper className='ZMediaCard-root' data-testid='ZMediaCard-root' elevation={5}>
      <Card>
        <CardHeader className='ZMediaCard-header' avatar={props.avatar} title={<h3>{props.headerText}</h3>} subheader={props.subHeaderText} />
        <CardMedia className='ZMediaCard-image' component='img' image={props.imageUrl} title={props.headerText} />
        <CardContent>
          <Button className='ZMediaCard-btn-action' data-testid='ZMediaCard-btn-action' variant='outlined' color={props.actionColor} fullWidth={true} onClick={props.onAction}>
            {props.actionText}
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
}

ZMediaCard.defaultProps = {
  subHeaderText: null,

  avatar: null,
  action: null,

  actionText: 'Run...',
  actionColor: 'primary',

  onAction: noop
};
