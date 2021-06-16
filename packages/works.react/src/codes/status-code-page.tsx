import { Grid } from '@material-ui/core';
import { ZHttpCode } from '@zthun/works.core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ZHttpStatusCodeCard } from './http-code-card';

/**
 * Renders a page that displays a status code card.
 *
 * This is a standard page object that uses a code on the route params.
 *
 * @returns The jsx that renders the status code page.
 */
export function ZStatusCodePage() {
  const { code } = useParams<{ code: string }>();

  return (
    <Grid container={true} spacing={3} className='ZStatusCodePage-root' data-testid='ZStatusCodePage-root' justify='center'>
      <Grid item={true}>
        <ZHttpStatusCodeCard code={+code as ZHttpCode} />
      </Grid>
    </Grid>
  );
}

/**
 * The route to use when importing this page object.
 */
ZStatusCodePage.route = '/status-code/:code';
