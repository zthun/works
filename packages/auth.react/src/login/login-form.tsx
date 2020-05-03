import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import React from 'react';

export function ZLoginForm() {
  return (
    <div className='ZLoginForm-root' data-testid='ZLoginForm-root'>
      <div className='ZLoginForm-existing-user mb-md' data-testid='ZLoginForm-existing-user'>
        <Card>
          <CardHeader classes={{ root: 'pb-sm' }} title={<h3 className='m-no p-no'>Login</h3>} subheader='Enter your credentials' />
          <CardContent>
            <form noValidate={true} autoComplete='off'>
              <TextField className='mb-md' fullWidth={true} label='Email' type='email' margin='none' variant='outlined' />
              <TextField className='mb-md' fullWidth={true} label='Password' type='password' margin='none' variant='outlined' />
              <Button fullWidth={true} variant='contained' color='primary'>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
