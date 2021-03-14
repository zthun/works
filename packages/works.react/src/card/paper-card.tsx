import { Card, CardMedia, CardContent, CardHeader, Paper, CardActions, Button } from '@material-ui/core';
import { noop } from 'lodash';
import React from 'react';
import { ZCircularProgress } from '../loading/circular-progress';
import { IZPaperCardProps } from './paper-card.props';

/**
 * Renders a material ui card wrapped in paper at a standard elevation.
 *
 * @param props The properties for the paper card.
 *
 * @returns The jsx for the paper card.
 */
export function ZPaperCard(props: IZPaperCardProps): JSX.Element {
  /**
   * Creates the card header.
   *
   * @returns The jsx for the CardHeader component.
   */
  function createHeader() {
    return <CardHeader className='ZPaperCard-header' avatar={props.avatar} title={<h3>{props.headerText}</h3>} subheader={props.subHeaderText} />;
  }

  /**
   * Creates the card media if the image url is set.
   *
   * @returns The jsx for the CardMedia component or null if the imageUrl is not set.
   */
  function createMedia() {
    return props.imageUrl ? (
      <CardMedia className={`ZPaperCard-media ZPaperCard-media-width-${props.imageWidth} ZPaperCard-media-height-${props.imageHeight}`} data-testid='ZPaperCard-media' component='img' image={props.imageUrl} title={props.headerText} />
    ) : null;
  }

  /**
   * Creates the card content body.
   *
   * @returns The jsx for the CardContent component.
   */
  function createContent() {
    return (
      <CardContent>
        {props.children}
        <ZCircularProgress className='ZPaperCard-progress-loading' data-testid='ZPaperCard-progress-loading' show={props.loading} size='2.5em' />
      </CardContent>
    );
  }

  /**
   * Creates the card actions component.
   *
   * @returns The jsx for the card actions.
   */
  function createActions() {
    return props.actionText ? (
      <CardActions className='ZPaperCard-actions' data-testid='ZPaperCard-actions'>
        <Button className='ZPaperCard-btn-action' data-testid='ZPaperCard-btn-action' fullWidth={true} variant='outlined' type={props.actionType} disabled={props.disabled} color={props.actionColor} onClick={props.onAction}>
          {props.actionText}
        </Button>
      </CardActions>
    ) : null;
  }

  return (
    <Paper className={`${props.className} ZPaperCard-root ZPaperCard-size-${props.size}`} data-testid={props['data-testid']} elevation={5}>
      <Card>
        {createHeader()}
        {createMedia()}
        {createContent()}
        {createActions()}
      </Card>
    </Paper>
  );
}

ZPaperCard.defaultProps = {
  subHeaderText: '',

  className: '',
  children: null,

  loading: false,
  disabled: false,
  size: 'auto',

  imageUrl: null,
  imageWidth: 'auto',
  imageHeight: 'auto',

  actionText: null,
  actionType: 'button',
  actionColor: 'primary',
  onAction: noop,

  avatar: null,
  action: null
};
