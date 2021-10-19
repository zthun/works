import { Grid } from '@mui/material';
import { ZHttpCode } from '@zthun/works.http';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
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

/**
 * Returns the jsx to render a status code page.
 *
 * This method is useful to use when you want to render a full status code page.
 * To use this, bind it with the name of the parameter you want.
 *
 * @example <Route render={renderStatusCodePage.bind(null, 'code')}
 *
 * @param name The name of the param on the route that holds the code.
 * @param props The route properties that holds the current url information.
 *
 * @returns The jsx to render a status code page.
 */
export function renderStatusCodePage(name: string, props: RouteComponentProps<any>) {
  return <ZStatusCodePage code={props.match.params.code} />;
}
