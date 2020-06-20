import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Paper, Typography } from '@material-ui/core';
import { noop } from 'lodash';
import React from 'react';
import { IZElevatedMediaCardProps } from './elevated-media-card.props';

/**
 * A basic material ui card that is elevated on paper in a consistent format.
 *
 * This is just a standard card that is usually used to go somewhere else.
 */
export function ZElevatedMediaCard(props: IZElevatedMediaCardProps) {
  function handleLearnMore() {
    props.onLearnMore();
  }

  return (
    <Paper className='ZElevatedMediaCard-root' data-testid='ZElevatedMediaCard-root' elevation={5}>
      <Card>
        <CardHeader title={<h3>{props.title}</h3>} />
        <CardMedia component='img' image={props.imageUrl} title={props.title} />
        <CardContent>
          <Typography variant='body1'>{props.children}</Typography>
        </CardContent>
        <CardActions>
          <Button variant='contained' color='primary' onClick={handleLearnMore}>
            {props.learnMoreText}
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}

ZElevatedMediaCard.defaultProps = {
  width: 'full',
  units: 'em',

  learnMoreText: 'Learn More...',
  onLearnMore: noop
};
