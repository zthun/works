import React from 'react';
import { ZPaperCard } from './paper-card';
import { Typography, Button } from '@material-ui/core';
import { ZCircularProgress } from './circular-progress';
import { IZActionFormProps } from './action-form.props';
import { noop } from 'lodash';

/**
 * An action form is similar to a summary card, but contains some content and an action button.
 */
export function ZActionForm(props: IZActionFormProps) {
  function handleAction() {
    props.onAction();
  }

  return (
    <ZPaperCard className={`${props.className} ZActionForm-root`} data-testid={props['data-testid']} headerText={props.headerText} subHeaderText={props.subHeaderText} avatar={props.avatar}>
      {props.children}

      <Button className='ZActionForm-btn-action' data-testid='ZActionForm-btn-action' fullWidth={true} variant='outlined' disabled={props.disabled} color={props.actionColor} onClick={handleAction}>
        {props.actionText}
        <ZCircularProgress className='ZActionForm-progress-loading' data-testid='ZActionForm-progress-loading' show={props.loading} />
      </Button>
    </ZPaperCard>
  );
}

ZActionForm.defaultProps = {
  className: '',
  subHeaderText: '',
  actionColor: 'primary',

  avatar: null,
  children: null,

  loading: false,
  disabled: false,

  onAction: noop
};
