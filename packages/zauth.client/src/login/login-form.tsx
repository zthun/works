import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';

export class ZLoginForm extends React.Component {
  public render() {
    return (
      <Card>
        <CardHeader title='Existing user?' subheader='Enter your credentials' />
        <CardContent>
          <form noValidate={true} autoComplete='off'>
            <TextField label='Email' type='email' margin='normal' variant='outlined' />
          </form>
        </CardContent>
      </Card>
    );
  }
}
