import { Grid } from '@material-ui/core';
import { ZHttpCode } from '@zthun/works.core';
import React from 'react';
import { ZHttpStatusCodeCard } from './http-code-card';
import { IZStatusCodePageProps } from './status-code-page.props';

/**
 * Renders a page that displays a status code card.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that renders the status code page.
 */
export function ZStatusCodePage(props: IZStatusCodePageProps) {
  return (
    <Grid container={true} spacing={3} className='ZStatusCodePage-root' data-testid='ZStatusCodePage-root' justifyContent='center'>
      <Grid item={true}>
        <ZHttpStatusCodeCard code={+props.code as ZHttpCode} />
      </Grid>
    </Grid>
  );
}
