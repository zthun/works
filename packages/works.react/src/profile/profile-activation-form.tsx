import PersonIcon from '@mui/icons-material/Person';
import { TextField, Typography } from '@mui/material';
import { IZProfileActivation, ZProfileActivationBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { FormEvent, useState } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { IZComponentDescription } from '../component/component-description.interface';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { makeStyles } from '../theme/make-styles';

/**
 * Represents properties for the profile activation form.
 */
export interface IZProfileActivationFormProps extends IZComponentLoading, IZComponentDisabled, IZComponentHeader, IZComponentDescription {
  /**
   * The text for the action button.
   */
  activateText?: string;

  /**
   * The text label for the key field.
   */
  keyText?: string;

  /**
   * The current activation entity.
   */
  activation: IZProfileActivation;

  /**
   * Occurs when the activation entity changes.
   *
   * @param activation The updated activation entity.
   */
  onActivationChange?: (activation: IZProfileActivation) => void;
}

const useProfileActivationStyles = makeStyles()((theme) => ({
  root: {
    minWidth: theme.sizing.card.sm,
    maxWidth: theme.sizing.card.md
  },

  key: {
    marginTop: theme.sizing.gaps.md
  }
}));

/**
 * Renders the form for activating a users profile.
 *
 * @param props The properties for the form.
 *
 * @returns The jsx for the form.
 */
export function ZProfileActivationForm(props: IZProfileActivationFormProps): JSX.Element {
  const [key, setKey] = useState(get(props, 'activation.key') || '');
  const styles = useProfileActivationStyles();

  /**
   * Occurs when the user enters input into the key field.
   *
   * @param t The event that contains the target with the update field text.
   */
  function handleKeyInput(t: any) {
    setKey(t.target.value);
  }

  /**
   * Occurs when the user clicks the activate button.
   *
   * This generates a new profile activation and raises the onActivationChange event.
   *
   * @param e The form event.
   */
  function handleActivate(e: FormEvent) {
    e.preventDefault();
    const empty = new ZProfileActivationBuilder().build();
    let activation = new ZProfileActivationBuilder().copy(props.activation || empty);
    activation = activation.key(key);
    props.onActivationChange(activation.build());
  }

  return (
    <form className={`ZProfileActivationForm-root ${styles.classes.root}`} data-testid='ZProfileActivationForm-root' noValidate={true} onSubmit={handleActivate}>
      <ZPaperCard avatar={props.avatar} headerText={props.headerText} subHeaderText={props.subHeaderText} actionText={props.activateText} actionType='submit' loading={props.loading} disabled={props.disabled || !key}>
        <Typography variant='body1' component='p'>
          {props.description}
        </Typography>

        <div className={styles.classes.key}>
          <TextField
            className='ZProfileActivationForm-input-key'
            data-testid='ZProfileActivationForm-input-key'
            fullWidth={true}
            disabled={props.disabled}
            label={props.keyText}
            type='text'
            margin='none'
            variant='outlined'
            required
            value={key}
            onInput={handleKeyInput}
          />
        </div>
      </ZPaperCard>
    </form>
  );
}

ZProfileActivationForm.defaultProps = {
  headerText: 'Activate Account',
  subHeaderText: 'Activate your account',
  avatar: <PersonIcon fontSize='large' />,
  keyText: 'Key',
  activateText: 'Activate',

  description: 'You must activate your account before you are allowed to perform any account related actions. Check your email for an activation key and copy it here.',

  disabled: false,
  loading: false,

  activation: null,
  onActivationChange: noop
};
