import { Grid } from '@material-ui/core';
import { ZElevatedMediaCard } from '@zthun/works.react';
import React from 'react';

export function ZHomePage() {
  return (
    <Grid container={true} spacing={3} className='ZHomePage-root' justify='center'>
      <Grid item={true}>
        <ZElevatedMediaCard />
      </Grid>
      <Grid item={true}>
        <ZElevatedMediaCard />
      </Grid>
      <Grid item={true}>
        <ZElevatedMediaCard />
      </Grid>
    </Grid>
  );
}
