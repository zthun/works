import { Card, CardContent, CardHeader, TextField, Button } from '@material-ui/core';
import * as React from 'react';

export class ZLoginForm extends React.Component {
  public render() {
    return (
      <Card>
        <CardHeader title='Existing user?' subheader='Enter your credentials' />
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
