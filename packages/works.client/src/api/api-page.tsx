import { Grid } from '@material-ui/core';
import { ZTypedocViewer } from '@zthun/works.react';
import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Represents the api page for a package.
 *
 * @returns The jsx that renders the api page for a package.
 */
export function ZApiPage() {
  const { pkg } = useParams<{ pkg: string }>();
  const src = `docs/${pkg}.typedoc.json`;

  return (
    <Grid container={true} spacing={3} className='ZApiPage-root' data-testid='ZApiPage-root' justify='center'>
      <Grid item={true}>
        <ZTypedocViewer src={src} />
      </Grid>
    </Grid>
  );
}
