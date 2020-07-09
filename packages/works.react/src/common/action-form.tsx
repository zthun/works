import { Button } from '@material-ui/core';
import { noop } from 'lodash';
import React from 'react';
import { IZActionFormProps } from './action-form.props';
import { ZCircularProgress } from './circular-progress';
import { ZPaperCard } from './paper-card';

/**
 * An action form is similar to a summary card, but contains some content and an action button.
 */
export function ZActionForm(props: IZActionFormProps) {
  function handleAction() {
    props.onAction();
  }

  return (
    <ZPaperCard className={`${props.className} ZActionForm-root`} data-testid={props['data-testid']} headerText={props.headerText} subHeaderText={props.subHeaderText} avatar={props.avatar}>
      <form data-testid='ZActionForm-form' noValidate={true} autoComplete='off' onSubmit={handleAction}>
        {props.children}

        <Button className='ZActionForm-btn-action' data-testid='ZActionForm-btn-action' fullWidth={true} variant='outlined' type='submit' disabled={props.disabled} color={props.actionColor}>
          {props.actionText}
          <ZCircularProgress className='ZActionForm-progress-loading' data-testid='ZActionForm-progress-loading' show={props.loading} />
        </Button>
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

  loading: false,
  disabled: false,

  onAction: noop
};
