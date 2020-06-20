import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Paper, Typography } from '@material-ui/core';
import { noop } from 'lodash';
import React from 'react';
import { IZSummaryCardProps } from './summary-card.props';

/**
 * Represents a pretty elevated card that is meant to lead users to another area of the site.
 */
export function ZSummaryCard(props: IZSummaryCardProps) {
  function handleLearnMore() {
    props.onLearnMore();
  }

  return (
    <Paper className='ZSummaryCard-root' data-testid='ZSummaryCard-root' elevation={5}>
      <Card>
        <CardHeader className='ZSummaryCard-header' data-testid='ZSummaryCard-header' title={<h3>{props.title}</h3>} />
        <CardMedia className='ZSummaryCard-media' data-testid='ZSummaryCard-media' component='img' image={props.imageUrl} title={props.title} />
        <CardContent className='ZSummaryCard-content' data-testid='ZSummaryCard-content'>
          <Typography variant='body1'>{props.children}</Typography>
        </CardContent>
        <CardActions className='ZSummaryCard-actions' data-testid='ZSummaryCard-actions'>
          <Button className='ZSummaryCard-btn-learn' data-testid='ZSummaryCard-btn-learn' variant='contained' color='primary' onClick={handleLearnMore}>
            {props.learnMoreText}
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}

ZSummaryCard.defaultProps = {
  width: 'full',
  units: 'em',

  learnMoreText: 'Learn More...',
  onLearnMore: noop
};
