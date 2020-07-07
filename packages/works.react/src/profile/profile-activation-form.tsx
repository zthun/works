import { Card, CardContent, CardHeader, Paper } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { IZProfileActivationFormProps } from './profile-activation-form.props';

export function ZProfileActivationForm(props: IZProfileActivationFormProps) {
  return (
    <Paper className='ZProfileActivationForm-root' data-testid='ZProfileForm-root' elevation={5}>
      <Card>
        <CardHeader className='ZProfileFormActivationForm-header' avatar={<PersonIcon className='ZProfileFormActivationForm-icon-user' fontSize='large' />} title={<h3>{props.headerText}</h3>} subheader={props.subHeaderText} />
        <CardContent>Profile Activation Form</CardContent>
      </Card>
    </Paper>
  );
}

ZProfileActivationForm.defaultProps = {
  headerText: 'Profile',
  subHeaderText: 'Activate your account'
};
