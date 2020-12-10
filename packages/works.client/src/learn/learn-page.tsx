import { Grid } from '@material-ui/core';
import React from 'react';

/**
 * Returns the jsx for the learn page.
 *
 * @returns The jsx for the learn page.
 */
export function ZLearnPage() {
  return (
    <Grid container={true} spacing={3} className='ZLearnPage-root' data-testid='ZLearnPage-root' justify='center'>
      <Grid item={true}></Grid>
    </Grid>
  );
}
