import { Grid } from '@material-ui/core';
import { ZHttpCodeClient } from '@zthun/works.core';
import { ZHttpCodeCard } from '@zthun/works.react';
import React from 'react';

export function ZNotFoundPage() {
  return (
    <Grid container={true} spacing={3} className='ZNotFoundPage-root' data-testid='ZNotFoundPage-root' justify='center'>
      <Grid item={true}>
        <ZHttpCodeCard code={ZHttpCodeClient.NotFound} />;
      </Grid>
    </Grid>
  );
}
