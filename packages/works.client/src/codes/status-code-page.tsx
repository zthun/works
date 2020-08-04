import { Grid } from '@material-ui/core';
import { ZHttpCodeClient } from '@zthun/works.core';
import { ZHttpStatusCodeCard } from '@zthun/works.react';
import React from 'react';
import { useParams } from 'react-router-dom';

export function ZStatusCodePage() {
  const { code } = useParams();

  return (
    <Grid container={true} spacing={3} className='ZStatusCodePage-root' data-testid='ZStatusCodePage-root' justify='center'>
      <Grid item={true}>
        <ZHttpStatusCodeCard code={+code as ZHttpCodeClient} />
      </Grid>
    </Grid>
  );
}
