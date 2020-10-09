import { Button, Grid } from '@material-ui/core';
import { noop } from 'lodash';
import React, { FormEvent, useState } from 'react';
import { IZActionFormProps } from './action-form.props';
import { ZCircularProgress } from './circular-progress';
import { ZPaperCard } from './paper-card';

/**
 * Renders an action form that is similar to a summary card, but contains some content and an action button.
 *
 * @param props The properties for the form.
 *
 * @returns The jsx for the form.
 */
export function ZActionForm(props: IZActionFormProps) {
  const [confirming, setConfirming] = useState(false);

  /**
   * Occurs when the user is presented with a confirmation and chooses to cancel the operation.
   */
  function handleCancel() {
    setConfirming(false);
  }

  /**
   * Does one of two possible actions.  If this form requires a confirmation, then the action buttons switch to a confirmation
   * yes/no flow.  Otherwise, the onAction event is raised.
   *
   * @param event The form event to handle.
   */
  function handleAction(event: FormEvent) {
    event.preventDefault();
    if (confirming || !props.confirmation) {
      handleCancel();
      props.onAction();
    } else {
      setConfirming(true);
    }
  }

  const content = confirming ? props.confirmation : props.children;

  const submission = confirming ? (
    <Grid container={true} className='ZActionForm-confirmation' spacing={2}>
      <Grid item={true} md={6}>
        <Button className='ZActionForm-btn-yes' data-testid='ZActionForm-btn-yes' fullWidth={true} variant='outlined' type='submit' disabled={props.disabled} color='secondary'>
          {props.yesText}
        </Button>
      </Grid>
      <Grid item={true} md={6}>
        <Button className='ZActionForm-btn-no' data-testid='ZActionForm-btn-no' fullWidth={true} variant='outlined' type='button' onClick={handleCancel} disabled={props.disabled} color='primary'>
          {props.noText}
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Button className='ZActionForm-btn-action' data-testid='ZActionForm-btn-action' fullWidth={true} variant='outlined' type='submit' disabled={props.disabled} color={props.actionColor}>
      {props.actionText}
      <ZCircularProgress className='ZActionForm-progress-loading' data-testid='ZActionForm-progress-loading' show={props.loading} />
    </Button>
  );

  return (
    <ZPaperCard className={`${props.className} ZActionForm-root`} data-testid={props['data-testid']} headerText={props.headerText} subHeaderText={props.subHeaderText} avatar={props.avatar}>
      <form data-testid='ZActionForm-form' noValidate={true} onSubmit={handleAction}>
        {content}
        {submission}
      </form>
    </ZPaperCard>
  );
}

ZActionForm.defaultProps = {
  className: '',
  subHeaderText: '',
  actionColor: 'primary',

  avatar: null,
  children: null,

  confirmation: null,
  yesText: 'Yes',
  noText: 'No',

  loading: false,
  disabled: false,

  onAction: noop
};
