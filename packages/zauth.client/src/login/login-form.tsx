import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardHeader, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';

export class ZLoginForm extends Component {
  public render() {
    return (
      <Card>
        <CardHeader
          title='Existing user?'
          subheader='Enter your credentials'
          avatar={<FontAwesomeIcon icon={faSignInAlt} size='3x' />}
        />
        <CardContent>
          <form noValidate={true} autoComplete='off'>
            <TextField className='mb-md' fullWidth={true} label='Email' type='email' margin='none' variant='outlined' />
            <TextField className='mb-md' fullWidth={true} label='Password' type='password' margin='none' variant='outlined' />
            <Button fullWidth={true} variant='contained' color='primary'>Login</Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
