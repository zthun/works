import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Paper, Typography } from '@material-ui/core';
import { noop } from 'lodash';
import React from 'react';
import { IZSummaryCardProps } from './summary-card.props';

/**
 * Renders a pretty elevated card that is meant to lead users to another area of the site.
 *
 * @param props The properties for the card.
 *
 * @returns The jsx for the summary card.
 */
export function ZSummaryCard(props: IZSummaryCardProps) {
  return (
    <Paper className='ZSummaryCard-root' data-testid='ZSummaryCard-root' elevation={5}>
      <Card>
        <CardHeader className='ZSummaryCard-header' data-testid='ZSummaryCard-header' avatar={props.avatar} action={props.action} title={<h3>{props.headerText}</h3>} subheader={props.subHeaderText} />
        <CardMedia className='ZSummaryCard-media' data-testid='ZSummaryCard-media' component='img' image={props.imageUrl} title={props.headerText} />
        <CardContent className='ZSummaryCard-content' data-testid='ZSummaryCard-content'>
          <Typography variant='body1'>{props.children}</Typography>
        </CardContent>
        <CardActions className='ZSummaryCard-actions' data-testid='ZSummaryCard-actions'>
          <Button className='ZSummaryCard-btn-action' data-testid='ZSummaryCard-btn-action' variant='outlined' color='primary' onClick={props.onAction}>
            {props.actionText}
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}

ZSummaryCard.defaultProps = {
  width: 'full',
  units: 'em',

  actionText: 'Learn More...',
  actionColor: 'primary',
  onAction: noop
};
