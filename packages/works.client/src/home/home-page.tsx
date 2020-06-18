import { Typography } from '@material-ui/core';
import React from 'react';

export function ZHomePage() {
  return (
    <div className='ZHomePage-root' data-testid='ZHomePage-root'>
      <Typography variant='h2'>You have reached the home page. This page is accessable to everyone!</Typography>
    </div>
  );
}
