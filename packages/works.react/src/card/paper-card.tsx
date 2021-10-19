import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, FormControlLabel, Paper } from '@mui/material';
import { ZDataUrlBuilder, ZMimeTypeImage } from '@zthun/works.url';
import { noop } from 'lodash';
import React, { useState } from 'react';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentConfirmable } from '../component/component-confirmable.interface';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentMedia } from '../component/component-media.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { ZCircularBackdrop } from '../loading/circular-backdrop';

/**
 * Represents the properties for the paper card component.
 */
export interface IZPaperCardProps extends IZComponentHeader, IZComponentHierarchy, IZComponentStyle, IZComponentMedia, IZComponentSizeable, IZComponentLoading, IZComponentDisabled, IZComponentActionable, IZComponentConfirmable {}

/**
 * Renders a material ui card wrapped in paper at a standard elevation.
 *
 * @param props The properties for the paper card.
 *
 * @returns The jsx for the paper card.
 */
export function ZPaperCard(props: IZPaperCardProps): JSX.Element {
  const {
    headerText,
    subHeaderText = '',
    className = '',
    children = null,
    loading = false,
    disabled = false,
    size = 'auto',
    imageUrl = null,
    imageWidth = 'auto',
    imageHeight = 'auto',
    actionText = null,
    actionType = 'button',
    actionColor = 'primary',
    confirmation = null,
    confirmationName = null,
    confirmationColor = 'default',
    autoConfirm = false,
    avatar = null,

    onAction = noop
  } = props;

  const [confirmed, setConfirmed] = useState(autoConfirm);

  /**
   * Sets the confirmed flag.
   *
   * @param event The event that changed the confirmation.
   */
  function updateConfirmed(event: any) {
    setConfirmed(event.target.checked);
  }

  /**
   * Occurs when the action button is clicked.
   */
  function handleAction() {
    setConfirmed(autoConfirm);
    onAction();
  }

  /**
   * Creates the card header.
   *
   * @returns The jsx for the CardHeader component.
   */
  function createHeader() {
    return <CardHeader className='ZPaperCard-header' avatar={avatar} title={<h3>{headerText}</h3>} subheader={subHeaderText} />;
  }

  /**
   * Creates the card media if the image url is set.
   *
   * @returns The jsx for the CardMedia component or null if the imageUrl is not set.
   */
  function createMedia() {
    if (!imageUrl) {
      return null;
    }

    const dataUri = new ZDataUrlBuilder().parse(imageUrl).info();

    if (dataUri.mimeType === ZMimeTypeImage.SVG) {
      // The buffer itself is just the <svg> tag. So we'll just use that.
      const image = dataUri.buffer.toString();
      return <div className={`ZPaperCard-media ZPaperCard-svg ZPaperCard-media-width-${imageWidth} ZPaperCard-media-height-${imageHeight}`} dangerouslySetInnerHTML={{ __html: image }} />;
    }

    return <CardMedia className={`ZPaperCard-media ZPaperCard-media-width-${imageWidth} ZPaperCard-media-height-${imageHeight}`} data-testid='ZPaperCard-media' component='img' image={imageUrl} title={headerText} />;
  }

  /**
   * Creates the card content body.
   *
   * @returns The jsx for the CardContent component.
   */
  function createContent() {
    const confirm =
      confirmation && actionText ? (
        <FormControlLabel className='ZPaperCard-actions-confirm' control={<Checkbox checked={confirmed} onChange={updateConfirmed} color={confirmationColor} name={confirmationName} />} label={confirmation} disabled={disabled} />
      ) : null;
    return (
      <CardContent>
        {children}
        {confirm}
      </CardContent>
    );
  }

  /**
   * Creates the card actions component.
   *
   * @returns The jsx for the card actions.
   */
  function createActions() {
    if (!actionText) {
      return null;
    }

    const isDisabled = disabled || (confirmation && !confirmed);

    return (
      <CardActions className='ZPaperCard-actions' data-testid='ZPaperCard-actions'>
        <Button className='ZPaperCard-btn-action' data-testid='ZPaperCard-btn-action' fullWidth={true} variant='outlined' type={actionType} disabled={isDisabled} color={actionColor} onClick={handleAction}>
          {actionText}
        </Button>
      </CardActions>
    );
  }

  return (
    <Paper className={`${className} ZPaperCard-root ZPaperCard-size-${size}`} data-testid={props['data-testid']} elevation={5}>
      <ZCircularBackdrop className='ZPaperCard-progress-loading' data-testid='ZPaperCard-progress-loading' show={loading} size='2.5em' />
      <Card>
        {createHeader()}
        {createMedia()}
        {createContent()}
        {createActions()}
      </Card>
    </Paper>
  );
}
