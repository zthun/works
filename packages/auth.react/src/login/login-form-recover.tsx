import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import React from 'react';

export function ZLoginFormRecover() {
  return (
    <div className='ZLoginFormRecover-root'>
      <Card>
        <CardHeader classes={{ root: 'pb-sm' }} title={<h3 className='m-no p-no'>Account recovery</h3>} subheader='Get back into your account' />
        <CardContent>
          <form noValidate={true} autoComplete='off'>
            <TextField className='mb-md' fullWidth={true} required={true} label='Email' type='email' margin='none' variant='outlined' />
            <Button fullWidth={true} variant='contained' color='primary'>
              Request password reset
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
